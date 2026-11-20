import Link from "next/link";
import { getSession } from "@/lib/dal";
import { Container } from "@/components/layout/container";
import { HeaderNav } from "@/components/layout/header-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserMenu } from "@/components/layout/user-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Posts" },
  { href: "/tags", label: "Tags" },
  { href: "/categories", label: "Categories" },
];

export async function SiteHeader() {
  // 계정 메뉴 표시만 결정한다. 인가는 각 진입점이 소유한다.
  const session = await getSession();
  const items = NAV_ITEMS;

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/92 backdrop-blur-sm">
      <Container className="flex h-full items-center gap-7">
        <Link
          href="/"
          className="text-[14.5px] font-semibold tracking-[-0.02em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
        >
          Abyssworks
        </Link>

        <HeaderNav items={items} />

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <UserMenu email={session?.user.email ?? null} />
          <MobileNav items={items} />
        </div>
      </Container>
    </header>
  );
}
