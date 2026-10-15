import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { APIError } from "better-auth/api";
import { prisma } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  databaseHooks: {
    user: {
      create: {
        // 첫 계정만 허용한다. 이후 가입 요청은 거부되어 단일 작성자 블로그로 유지된다.
        before: async (user) => {
          if ((await prisma.user.count()) > 0) {
            throw new APIError("FORBIDDEN", {
              message: "Sign-up is closed.",
            });
          }
          return { data: user };
        },
      },
    },
  },
  plugins: [nextCookies()],
});
