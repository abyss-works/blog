"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenLineIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/blocks/sign-out-button";

interface UserMenuProps {
  /** 로그인한 사용자 이메일. 없으면 로그인 링크만 그린다. */
  email: string | null;
}

const itemClass =
  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

export function UserMenu({ email }: UserMenuProps) {
  // 연 시점의 경로를 기억해 경로가 바뀌면 닫힌 상태가 된다.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openedAt === pathname;
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭과 Escape로 닫는다. document는 외부 시스템이라 Effect로 구독한다.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenedAt(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedAt(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!email) {
    return (
      <Button asChild variant="ghost" size="icon" aria-label="Sign in">
        <Link href="/sign-in">
          <UserIcon aria-hidden="true" />
        </Link>
      </Button>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="계정 메뉴"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenedAt(open ? null : pathname)}
      >
        <UserIcon aria-hidden="true" />
      </Button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full right-0 mt-2 w-60 rounded-xl border border-border bg-background p-1 shadow-md"
      >
        <p className="truncate px-3 py-2 text-xs text-muted-foreground">{email}</p>
        <Link href="/admin" className={itemClass}>
          <PenLineIcon aria-hidden="true" className="size-4" />
          New Post
        </Link>
        <SignOutButton className={itemClass} />
      </div>
    </div>
  );
}
