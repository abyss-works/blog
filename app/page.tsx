import { getPosts, getTaxonomy } from "@/services/post";
import { Container } from "@/components/layout/container";
import { HomeFeed } from "@/components/blocks/home-feed";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [posts, taxonomy] = await Promise.all([getPosts(), getTaxonomy()]);

  return (
    <Container>
      <HomeFeed posts={posts} categories={taxonomy.categories} />
    </Container>
  );
}
