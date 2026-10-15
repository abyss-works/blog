import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { APIError } from "better-auth/api";
import { prisma } from "@/lib/db";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  // 키가 둘 다 있을 때만 Google을 켠다. 없으면 이메일 로그인만 남는다.
  socialProviders:
    googleClientId && googleClientSecret
      ? { google: { clientId: googleClientId, clientSecret: googleClientSecret } }
      : {},
  account: {
    accountLinking: {
      // 첫 계정은 비밀번호 가입이라 emailVerified가 없다. Google이 검증한 같은 이메일이면 그 계정에 연결한다.
      requireLocalEmailVerified: false,
    },
  },
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
