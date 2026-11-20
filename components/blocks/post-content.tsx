import { isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { slugify, uniqueIds } from "@/lib/markdown";
import { CodeBlock } from "@/components/blocks/code-block";

/** 제목 요소의 자식에서 순수 텍스트만 모은다. */
function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: React.ReactNode }>(node)) {
    return textOf(node.props.children);
  }
  return "";
}

function languageOf(node: React.ReactNode): string | undefined {
  if (!isValidElement<{ className?: string }>(node)) return undefined;
  const cls = node.props.className ?? "";
  const match = cls.match(/language-([\w-]+)/);
  return match?.[1];
}

const headingClass = "scroll-mt-20 font-semibold tracking-[-0.02em] text-foreground";

function buildComponents(): Components {
  // 목차(extractHeadings)와 같은 순서·규칙으로 id를 매긴다.
  const nextId = uniqueIds();
  return {
    pre({ children }) {
      const lang = languageOf(children);
      return <CodeBlock language={lang}>{children}</CodeBlock>;
    },
    code({ className, children, ...props }) {
      const isInline = !className;
      if (isInline) {
        return (
          <code
            className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
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
    h1({ children }) {
      // 페이지 제목이 h1이므로 본문의 h1은 h2 수준으로 낮춘다. 목차에는 넣지 않는다.
      return <h2 className={`mt-11 mb-3.5 text-xl ${headingClass}`}>{children}</h2>;
    },
    h2({ children }) {
      return (
        <h2
          id={nextId(slugify(textOf(children)))}
          className={`mt-11 mb-3.5 text-xl ${headingClass}`}
        >
          {children}
        </h2>
      );
    },
    h3({ children }) {
      return (
        <h3
          id={nextId(slugify(textOf(children)))}
          className={`mt-8 mb-2.5 text-[17px] ${headingClass}`}
        >
          {children}
        </h3>
      );
    },
    p({ children }) {
      return <p className="mb-4.5">{children}</p>;
    },
    strong({ children }) {
      return <strong className="font-semibold text-foreground">{children}</strong>;
    },
    ul({ children }) {
      return <ul className="mb-5 list-disc space-y-1.5 pl-6">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="mb-5 list-decimal space-y-1.5 pl-6">{children}</ol>;
    },
    li({ children }) {
      return <li>{children}</li>;
    },
    blockquote({ children }) {
      return (
        <blockquote className="my-6 border-l border-mineral pl-4 text-[15px] text-muted-foreground">
          {children}
        </blockquote>
      );
    },
    a({ href, children }) {
      return (
        <a
          href={href}
          className="text-foreground underline decoration-border-strong decoration-1 underline-offset-4 transition-colors hover:decoration-mineral"
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
      return (
        // eslint-disable-next-line @next/next/no-img-element -- 외부 이미지, 크기 미상
        <img
          src={src}
          alt={alt ?? ""}
          className="my-6 rounded-md border border-border"
          loading="lazy"
        />
      );
    },
    table({ children }) {
      return (
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">{children}</table>
        </div>
      );
    },
    th({ children }) {
      return (
        <th className="border-b border-border py-2.5 pr-3 text-left font-medium text-foreground">
          {children}
        </th>
      );
    },
    td({ children }) {
      return (
        <td className="border-b border-border py-2.5 pr-3 align-top">
          {children}
        </td>
      );
    },
  };
}

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="text-[16px] leading-[1.88] text-body-secondary">
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
