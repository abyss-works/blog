import Link from "next/link";
import { verifySession } from "@/lib/dal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SignOutButton } from "./sign-out-button";
import { PostForm } from "./post-form";

export default async function AdminPage() {
  const { user } = await verifySession();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">새 글</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">← 목록</Link>
            </Button>
            <SignOutButton />
          </div>
        </div>

        <Separator className="mb-8" />

        <PostForm />
      </div>
    </main>
  );
}
