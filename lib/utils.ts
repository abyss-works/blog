import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** 화면에는 월까지만 보여준다(YYYY-MM). 데이터의 날짜는 그대로 둔다. */
export function formatMonth(date: string) {
  return date.slice(0, 7)
}

export function postHref(post: { id: string; slug?: string }) {
  return post.slug ? `/posts/${post.slug}-${post.id}` : `/posts/${post.id}`
}

export function tagHref(tag: string) {
  return `/tags/${encodeURIComponent(tag)}`
}

export function categoryHref(category: string) {
  return `/categories/${encodeURIComponent(category)}`
}
