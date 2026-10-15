import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function tagHref(tag: string) {
  return `/tags/${encodeURIComponent(tag)}`
}
