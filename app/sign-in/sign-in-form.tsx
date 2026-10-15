"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignInFormProps {
  /** 서버에 GOOGLE_CLIENT_ID·SECRET이 있을 때만 Google 버튼을 그린다. */
  googleEnabled: boolean;
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.8-5.4 3.8-3.3 0-5.9-2.7-5.9-6s2.6-6 5.9-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.6 2.3 2.3 6.6 2.3 12S6.6 21.7 12 21.7c5.6 0 9.3-3.9 9.3-9.5 0-.6-.1-1.1-.2-1.6H12z" />
    </svg>
  );
}

export function SignInForm({ googleEnabled }: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleGoogle() {
    setPending(true);
    setError("");
    const res = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/admin",
      errorCallbackURL: "/sign-in",
    });
    if (res.error) {
      setError(res.error.message ?? "Google 로그인에 실패했습니다.");
      setPending(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");

    const signIn = await authClient.signIn.email({ email, password });
    if (!signIn.error) {
      router.push("/admin");
      router.refresh();
      return;
    }

    // 계정이 하나도 없을 때만 가입이 허용된다. 그 외에는 서버가 거부한다.
    const signUp = await authClient.signUp.email({ email, password, name: email });
    if (signUp.error) {
      setError(signIn.error.message ?? "로그인에 실패했습니다.");
      setPending(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {googleEnabled && (
        <>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={pending}
            onClick={handleGoogle}
          >
            <GoogleMark />
            Continue with Google
          </Button>
          <p className="text-center text-xs text-muted-foreground">또는 이메일로</p>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "확인 중..." : "로그인"}
        </Button>
      </form>
    </div>
  );
}
