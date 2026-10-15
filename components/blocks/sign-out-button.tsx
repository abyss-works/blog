"use client";

import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleSignOut} className={className}>
      <LogOutIcon aria-hidden="true" className="size-4" />
      Sign out
    </button>
  );
}
