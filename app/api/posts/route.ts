import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PostStatus } from "@/lib/generated/prisma/enums";
import crypto from "crypto";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug: clientSlug, title, description, content, tags } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "title, content are required" },
        { status: 400 }
      );
    }

    const uuid = crypto.randomUUID();
    const urlId = uuid.substring(0, 8);
    const kebab = clientSlug || toKebab(title);
    const slug = kebab || null;

    const post = await prisma.post.create({
      data: {
        id: uuid,
        urlId,
        slug,
        title,
        description: description ?? "",
        content,
        tags: tags ?? [],
        status: PostStatus.PUBLISHED,
      },
    });

    return NextResponse.json({ ok: true, id: post.urlId, slug: post.slug });
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
