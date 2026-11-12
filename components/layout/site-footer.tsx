import Link from "next/link";
import { Container } from "@/components/layout/container";

const linkClass =
  "inline-flex h-9 items-center rounded-md px-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

function GitHubMark() {
  // lucide는 브랜드 아이콘을 제공하지 않아 GitHub 마크를 직접 그린다.
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 fill-current">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 font-semibold tracking-tight">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full bg-gradient-to-b from-foreground to-muted-foreground"
            />
            Abyssworks
          </p>
          <p className="text-xs text-muted-foreground">
            Solutions against the Deep
          </p>
        </div>
        <nav aria-label="푸터">
          <ul className="flex items-center gap-1 text-sm">
            <li>
              <Link href="/about" className={linkClass}>
                About
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/abyss-works"
                rel="noreferrer"
                aria-label="GitHub"
                className={linkClass}
              >
                <GitHubMark />
              </a>
            </li>
          </ul>
        </nav>
      </Container>
      <Container className="pb-8 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Abyssworks Studio
      </Container>
    </footer>
  );
}
