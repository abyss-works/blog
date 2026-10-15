"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const noop = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // 서버는 테마를 모르므로 클라이언트 마운트 뒤에만 아이콘을 그린다.
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  if (!mounted) {
    return <span aria-hidden="true" className="inline-block size-9" />;
  }

  const dark = resolvedTheme === "dark";
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={dark ? "라이트 테마로 전환" : "다크 테마로 전환"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <SunIcon aria-hidden="true" /> : <MoonIcon aria-hidden="true" />}
    </Button>
  );
}
