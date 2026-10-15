import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  // 서버 환경변수로만 판단한다. 값 자체는 클라이언트로 보내지 않는다.
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <h1>Sign in</h1>
          </CardTitle>
          <CardDescription>
            계정이 없으면 첫 로그인 시 생성됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm googleEnabled={googleEnabled} />
        </CardContent>
      </Card>
    </div>
  );
}
