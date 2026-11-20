"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/components/layout/site-header";

interface HeaderNavProps {
  items: NavItem[];
}

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/posts/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav({ items }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="주 메뉴" className="hidden md:block">
      <ul className="flex items-center gap-5">
        {items.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex h-14 items-center text-[13.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm",
                  active
                    ? "font-medium text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-mineral"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
