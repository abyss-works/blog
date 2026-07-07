import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { PostStatus } from "@/lib/generated/prisma/enums";

const FrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional().default(""),
  date: z.union([z.string(), z.date()]).transform((v) =>
    v instanceof Date ? v.toISOString().split("T")[0] : v
  ),
  tags: z.array(z.string()).default([]),
});

async function main() {
  const contentDir = join(process.cwd(), "content");
  const files = readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  let imported = 0;

  for (const file of files) {
    const raw = readFileSync(join(contentDir, file), "utf-8");
    const { data, content } = matter(raw);
    const parsed = FrontmatterSchema.parse(data);

    const uuid = crypto.randomUUID();
    const urlId = uuid.substring(0, 8);
    const slug = `${parsed.slug}-${urlId}`;
    const postData = {
      title: parsed.title,
      description: parsed.description,
      content,
      date: new Date(parsed.date),
      tags: parsed.tags,
      status: PostStatus.PUBLISHED,
    };

    const existing = await prisma.post.findFirst({
      where: { slug: parsed.slug },
    });

    if (existing) {
      await prisma.post.update({
        where: { id: existing.id },
        data: { slug, ...postData },
      });
      console.log(`✔ updated: ${parsed.slug}`);
    } else {
      await prisma.post.create({
        data: { id: uuid, urlId, slug, ...postData },
      });
      console.log(`✔ imported: ${parsed.slug} → ${slug}`);
    }
    imported++;
  }

  console.log(`\nDone. ${imported} posts processed.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
