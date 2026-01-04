import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env.local");
console.log("Loading env from:", envPath);
dotenv.config({ path: envPath });
// also load .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

console.log("CWD:", process.cwd());

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Start seeding...");

  // 1. Create Profile (Admin)
  // Note: In real app, this ID should match Supabase Auth User ID.
  // For seeding, we use a random UUID or a fixed one if you have it.
  const adminId = "00000000-0000-0000-0000-000000000000"; // Placeholder

  const adminProfile = await prisma.profile.upsert({
    where: { id: adminId },
    update: {},
    create: {
      id: adminId,
      username: "Abyssworks Admin",
      role: "admin",
      avatar_url: "https://github.com/shadcn.png",
    },
  });

  console.log("Created admin profile:", adminProfile.username);

  // 2. Create Categories & Tags
  const devCategory = await prisma.category.upsert({
    where: { slug: "development" },
    update: {},
    create: { name: "Development", slug: "development" },
  });

  const nextjsTag = await prisma.tag.upsert({
    where: { slug: "nextjs" },
    update: {},
    create: { name: "Next.js", slug: "nextjs" },
  });

  const prismaTag = await prisma.tag.upsert({
    where: { slug: "prisma" },
    update: {},
    create: { name: "Prisma", slug: "prisma" },
  });

  // 3. Create Posts
  const post1 = await prisma.post.upsert({
    where: { slug: "welcome-to-abyssworks" },
    update: {},
    create: {
      title: "Welcome to Abyssworks Studio",
      slug: "welcome-to-abyssworks",
      content: `
# Welcome

This is the first post on the **Abyssworks Studio** blog.
We are using Next.js 15, Tailwind CSS, and Prisma with Supabase.

## Features

- **Performance**: Static generation & Server Components
- **Style**: Modern dark mode aesthetics
- **Type Safety**: Full TypeScript support
      `,
      description: "The first introduction to our engineering blog.",
      published: true,
      author_id: adminProfile.id,
      categories: {
        connect: { id: devCategory.id },
      },
      tags: {
        connect: [{ id: nextjsTag.id }, { id: prismaTag.id }],
      },
    },
  });

  console.log(`Created post: ${post1.title}`);

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
