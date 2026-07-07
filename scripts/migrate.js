const { readdirSync, readFileSync } = require("fs");
const { join } = require("path");

async function main() {
  const { PrismaClient } = require("./lib/generated/prisma/client");
  const { PrismaPg } = require("@prisma/adapter-pg");

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  const migrationsDir = join(__dirname, "prisma/migrations");
  const dirs = readdirSync(migrationsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const dir of dirs) {
    const sqlPath = join(migrationsDir, dir, "migration.sql");
    try {
      const sql = readFileSync(sqlPath, "utf-8");
      await prisma.$executeRawUnsafe(sql);
      console.log(`✔ migration: ${dir}`);
    } catch (e) {
      const msg = e.message || String(e);
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
