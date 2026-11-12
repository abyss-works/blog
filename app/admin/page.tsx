import type { Metadata } from "next";
import { verifySession } from "@/lib/dal";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Separator } from "@/components/ui/separator";
import { PostForm } from "./post-form";

export const metadata: Metadata = { title: "New Post" };

export default async function AdminPage() {
  const { user } = await verifySession();

  return (
    <Container size="narrow" className="pb-8">
      <PageHeader title="New Post" description={user.email} />
      <Separator className="mb-8" />
      <PostForm />
    </Container>
  );
}
