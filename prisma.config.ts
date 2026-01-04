import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Load environment variables
dotenv.config({ path: ".env.local" });
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DIRECT_URL,
  },
});
