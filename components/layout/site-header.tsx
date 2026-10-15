import Link from "next/link";
import { PenLineIcon } from "lucide-react";
import { getSession } from "@/lib/dal";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Posts" },
  { href: "/tags", label: "Tags" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export async function SiteHeader() {
  // 링크 표시만 결정한다. 인가는 각 진입점이 소유한다.
  const session = await getSession();
  const items = session
    ? [...NAV_ITEMS, { href: "/admin", label: "글쓰기" }]
    : NAV_ITEMS;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <Container className="flex h-14 items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-gradient-to-b from-foreground to-muted-foreground"
          />
          Abyssworks
        </Link>

        <nav aria-label="주 메뉴" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {item.href === "/admin" && (
                    <PenLineIcon aria-hidden="true" className="size-4" />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 md:ml-2 max-md:ml-auto">
          <ThemeToggle />
          <MobileNav items={items} />
        </div>
      </Container>
    </header>
  );
}
