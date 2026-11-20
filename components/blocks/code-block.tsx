"use client";

import { useEffect, useRef, useState } from "react";

interface CodeBlockProps {
  language?: string;
  children: React.ReactNode;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (!mountedRef.current) return;
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (mountedRef.current) setCopied(false);
      }, 1400);
    } catch {
      // 클립보드 권한이 거부된 환경에서는 상태를 바꾸지 않는다.
    }
  }

  return (
    <div className="code-surface my-6 overflow-hidden rounded-[7px] border border-[#1d232c] bg-[#0d1014] text-[#d6dde5]">
      <div className="flex items-center justify-between border-b border-[#1d232c] bg-[#12161c] px-3.5 py-2 font-mono text-[11.5px] text-[#8d97a5]">
        <span>{language || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "복사됨" : "코드 복사"}
          className="rounded px-1.5 py-0.5 text-[11px] text-[#8d97a5] transition-colors hover:text-[#e2e8f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8bb5b2]"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? "코드를 복사했습니다." : ""}
      </span>
      <pre
        ref={preRef}
        className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.72]"
      >
        {children}
      </pre>
    </div>
  );
}
