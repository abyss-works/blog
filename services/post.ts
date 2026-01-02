import { BlogPost } from "@/types/blog";

// Mock Data
const POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "architecting-the-abyss",
    title: "Architecting the Abyss: A Deep Dive into Next.js 16",
    description: "Exploring the depths of Server Components and the new App Router paradigm for building scalable, high-performance applications.",
    date: "2026-01-02",
    tags: ["Next.js", "Architecture", "Server Components"],
  },
  {
    id: "2",
    slug: "minimalism-in-code",
    title: "The Art of Minimalism in Software Design",
    description: "Why less is often more when it comes to long-term maintainability and system robustness.",
    date: "2025-12-28",
    tags: ["Design Patterns", "Minimalism", "Refactoring"],
  },
  {
    id: "3",
    slug: "secure-by-default",
    title: "Secure by Default: Mitigating RCE in Modern Web Apps",
    description: "Addressing recent security concerns like CVE-2025-55182 with strict architectural boundaries.",
    date: "2025-12-15",
    tags: ["Security", "RCE", "Best Practices"],
  },
];

export async function getPosts(): Promise<BlogPost[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return POSTS;
}
