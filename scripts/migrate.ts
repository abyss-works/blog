import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL ?? "";

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  const migrationsDir = join(process.cwd(), "prisma/migrations");
  const dirs = readdirSync(migrationsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const dir of dirs) {
    const sqlPath = join(migrationsDir, dir, "migration.sql");
    try {
      const sql = readFileSync(sqlPath, "utf-8");
      // Use raw query to execute SQL
      await prisma.$executeRawUnsafe(sql);
      console.log(`✔ migration: ${dir}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      // Ignore "already exists" errors
      if (msg.includes("already exists")) {
        console.log(`✔ migration: ${dir} (already applied)`);
      } else {
        console.error(`✘ migration: ${dir} — ${msg}`);
      }
    }
  }

  await prisma.$disconnect();
  console.log("Migrations complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
