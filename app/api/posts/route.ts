import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { PostStatus } from "@/lib/generated/prisma/enums";
import { withAuth } from "@/lib/with-auth";

const createPostSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().optional(),
  content: z.string().min(1),
  slug: z.string().trim().optional(),
  tags: z.array(z.string().trim().min(1)).default([]),
  category: z.string().trim().max(50).optional(),
});

function toKebab(title: string): string {
  const ascii = title.replace(/[^\x00-\x7F]/g, "");
  if (ascii.trim()) {
    return ascii
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  return "";
}

export const POST = withAuth(async (request, _context, session) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const {
    title,
    description,
    content,
    slug: clientSlug,
    tags,
    category,
  } = parsed.data;

  try {
    const uuid = crypto.randomUUID();

    const post = await prisma.post.create({
      data: {
        id: uuid,
        urlId: uuid.substring(0, 8),
        slug: clientSlug || toKebab(title) || null,
        title,
        description: description ?? "",
        content,
        tags,
        category: category || null,
        status: PostStatus.PUBLISHED,
        authorId: session.user.id,
      },
    });

    return NextResponse.json({ ok: true, id: post.urlId, slug: post.slug });
  } catch (e) {
    console.error("failed to create post", e);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
});
