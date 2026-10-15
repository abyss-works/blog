import { isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { slugify, uniqueIds } from "@/lib/markdown";

/** 제목 요소의 자식에서 순수 텍스트만 모은다. */
function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: React.ReactNode }>(node)) {
    return textOf(node.props.children);
  }
  return "";
}

const headingClass = "scroll-mt-20 font-semibold tracking-tight text-foreground";

function buildComponents(): Components {
  // 목차(extractHeadings)와 같은 순서·규칙으로 id를 매긴다.
  const nextId = uniqueIds();
  return {
    pre({ children }) {
      return (
        <pre className="my-5 overflow-x-auto rounded-lg border border-border bg-zinc-950 p-4 font-mono text-[13.5px] leading-relaxed text-zinc-200">
          {children}
        </pre>
      );
    },
    code({ className, children, ...props }) {
      const isInline = !className;
      if (isInline) {
        return (
          <code
            className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h2({ children }) {
      return (
        <h2 id={nextId(slugify(textOf(children)))} className={`mt-10 mb-4 text-2xl ${headingClass}`}>
          {children}
        </h2>
      );
    },
    h3({ children }) {
      return (
        <h3 id={nextId(slugify(textOf(children)))} className={`mt-8 mb-3 text-xl ${headingClass}`}>
          {children}
        </h3>
      );
    },
    p({ children }) {
      return <p className="mb-5">{children}</p>;
    },
    ul({ children }) {
      return <ul className="mb-5 list-disc space-y-1 pl-6">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="mb-5 list-decimal space-y-1 pl-6">{children}</ol>;
    },
    li({ children }) {
      return <li>{children}</li>;
    },
    blockquote({ children }) {
      return (
        <blockquote className="mb-5 border-l-4 border-border pl-4 text-muted-foreground italic">
          {children}
        </blockquote>
      );
    },
    a({ href, children }) {
      return (
        <a
          href={href}
          className="underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    hr() {
      return <hr className="my-8 border-border" />;
    },
    img({ src, alt }) {
      // eslint-disable-next-line @next/next/no-img-element -- 외부 이미지, 크기 미상
      return <img src={src} alt={alt ?? ""} className="my-5 rounded-lg" loading="lazy" />;
    },
    table({ children }) {
      return (
        <div className="my-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">{children}</table>
        </div>
      );
    },
    th({ children }) {
      return <th className="border-b border-border px-3 py-2 text-left font-semibold">{children}</th>;
    },
    td({ children }) {
      return <td className="border-b border-border px-3 py-2 align-top">{children}</td>;
    },
  };
}

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="text-[17px] leading-[1.75] text-foreground/90">
      <ReactMarkdown
        components={buildComponents()}
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
