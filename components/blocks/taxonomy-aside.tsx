import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/layout/section-heading";
import { Count } from "@/types/blog";
import { categoryHref, tagHref } from "@/lib/utils";

interface TaxonomyAsideProps {
  categories: Count[];
  tags: Count[];
}

export function TaxonomyAside({ categories, tags }: TaxonomyAsideProps) {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <SectionHeading>Categories</SectionHeading>
        {categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">아직 카테고리가 없습니다.</p>
        ) : (
          <ul className="flex flex-col">
            {categories.map((c) => (
              <li key={c.name}>
                <Link
                  href={categoryHref(c.name)}
                  className="flex items-center justify-between gap-3 rounded-md py-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <span className="truncate">{c.name}</span>
                  <span className="font-mono text-xs">{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionHeading>Tags</SectionHeading>
        {tags.length === 0 ? (
          <p className="text-sm text-muted-foreground">아직 태그가 없습니다.</p>
        ) : (
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li key={t.name}>
                <Badge
                  asChild
                  variant="outline"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Link href={tagHref(t.name)}>
                    {t.name}
                    <span className="font-mono opacity-70">{t.count}</span>
                  </Link>
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
