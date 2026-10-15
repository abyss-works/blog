import type { NextRequest } from "next/server";
import { getSession, type AuthSession } from "@/lib/dal";

export function withAuth<Context = unknown>(
  handler: (
    request: NextRequest,
    context: Context,
    session: AuthSession,
  ) => Promise<Response>,
) {
  return async (request: NextRequest, context: Context): Promise<Response> => {
    const session = await getSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    return handler(request, context, session);
  };
}
