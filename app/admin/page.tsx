"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

function toSlug(title: string): string {
  // ASCII-only: lowercase, replace spaces with hyphens, remove special chars
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
  // Non-ASCII title (Korean, etc.): use timestamp
  return `post-${Date.now()}`;
}

export default function AdminPage() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setTitle(val);
      if (!slugManuallyEdited) {
        setSlug(toSlug(val));
      }
    },
    [slugManuallyEdited]
  );

  const handleSlugChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSlug(e.target.value);
      setSlugManuallyEdited(true);
    },
    []
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        title,
        description,
        content,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save");
      setSaving(false);
      return;
    }

    router.push(`/posts/${slug}`);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">New Post</h1>
          <a
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Back
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Slug</label>
              <input
                value={slug}
                onChange={handleSlugChange}
                placeholder="my-post-slug"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">
                Tags (comma separated)
              </label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Next.js, Architecture"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Title</label>
            <input
              value={title}
              onChange={handleTitleChange}
              placeholder="Post Title"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description for the card..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm text-zinc-400">
                Content (Markdown)
              </label>
              <span className="text-xs text-zinc-600">
                {content.length} chars
              </span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post in markdown..."
              rows={16}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-mono focus:outline-none focus:border-zinc-600 resize-y"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-950 border border-red-800 px-4 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-zinc-100 text-zinc-900 px-6 py-2 text-sm font-medium hover:bg-zinc-300 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Publish"}
          </button>
        </form>
      </div>
    </main>
  );
}
