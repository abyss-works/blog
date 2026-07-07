import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PostStatus } from "@/lib/generated/prisma/enums";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, title, description, content, tags } = body;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: "slug, title, content are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.post.findUnique({ where: { slug } });

    if (existing) {
      await prisma.post.update({
        where: { slug },
        data: {
          title,
          description: description ?? "",
          content,
          tags: tags ?? [],
          status: PostStatus.PUBLISHED,
        },
      });
    } else {
      await prisma.post.create({
        data: {
          slug,
          title,
          description: description ?? "",
          content,
          tags: tags ?? [],
          status: PostStatus.PUBLISHED,
        },
      });
    }

    return NextResponse.json({ ok: true, slug });
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
