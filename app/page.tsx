import { getPosts, getTaxonomy } from "@/services/post";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { WithAside } from "@/components/layout/with-aside";
import { Hero } from "@/components/blocks/hero";
import { PostGrid } from "@/components/blocks/post-grid";
import { TaxonomyAside } from "@/components/blocks/taxonomy-aside";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [posts, taxonomy] = await Promise.all([getPosts(), getTaxonomy()]);

  return (
    <>
      <Hero />
      <Container className="py-12">
        <WithAside
          asideLabel="분류"
          aside={
            <TaxonomyAside
              categories={taxonomy.categories}
              tags={taxonomy.tags}
            />
          }
        >
          <SectionHeading>Recents</SectionHeading>
          <PostGrid posts={posts} columns={2} emptyText="아직 글이 없습니다." />
        </WithAside>
      </Container>
    </>
  );
}
