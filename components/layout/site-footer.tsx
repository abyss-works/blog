import { Container } from "@/components/layout/container";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Abyssworks Studio</p>
        <a
          href="https://github.com/abyss-works"
          className="hover:text-foreground"
          rel="noreferrer"
        >
          GitHub
        </a>
      </Container>
    </footer>
  );
}
