import type { Metadata } from "next";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  // 서버 환경변수로만 판단한다. 값 자체는 클라이언트로 보내지 않는다.
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return (
    <div className="flex min-h-[64vh] items-center justify-center px-4 py-14">
      <section
        aria-label="로그인"
        className="frame-top-sheen w-full max-w-[392px] rounded-[10px] border border-border bg-card px-7 py-7.5"
      >
        <h1 className="text-[21px] font-semibold tracking-[-0.025em] text-foreground">
          Sign in
        </h1>
        <p className="mt-1.5 mb-6 text-[13.5px] text-muted-foreground">
          글 작성과 관리를 위해 계정으로 로그인합니다.
        </p>
        <SignInForm googleEnabled={googleEnabled} />
      </section>
    </div>
  );
}
