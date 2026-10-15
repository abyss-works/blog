import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type AuthSession = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>;

export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

export const verifySession = cache(async (): Promise<AuthSession> => {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return session;
});
