"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NavItem } from "@/components/layout/site-header";

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  // 연 시점의 경로를 기억해 경로가 바뀌면 저절로 닫힌 상태가 된다.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const open = openedAt === pathname;
  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <XIcon aria-hidden="true" className="size-4" />
        ) : (
          <MenuIcon aria-hidden="true" className="size-4" />
        )}
      </Button>
      <nav
        id={panelId}
        aria-label="모바일 주 메뉴"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-background"
      >
        <ul className="flex flex-col px-4 py-2">
          {items.map((item) => (
            <li key={item.href} className="border-b border-border last:border-b-0">
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="block py-3 text-[14.5px] text-body-secondary transition-colors hover:text-foreground aria-[current]:font-medium aria-[current]:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
