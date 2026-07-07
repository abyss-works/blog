import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  pre({ children }) {
    return (
      <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm leading-relaxed">
        {children}
      </pre>
    );
  },
  code({ className, children, ...props }) {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-200"
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
      <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-zinc-100">
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight text-zinc-100">
        {children}
      </h3>
    );
  },
  p({ children }) {
    return <p className="mb-4 leading-relaxed text-zinc-300">{children}</p>;
  },
  ul({ children }) {
    return <ul className="mb-4 list-disc space-y-1 pl-6 text-zinc-300">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="mb-4 list-decimal space-y-1 pl-6 text-zinc-300">{children}</ol>;
  },
  li({ children }) {
    return <li>{children}</li>;
  },
  blockquote({ children }) {
    return (
      <blockquote className="mb-4 border-l-4 border-zinc-700 pl-4 italic text-zinc-400">
        {children}
      </blockquote>
    );
  },
  a({ href, children }) {
    return (
      <a
        href={href}
        className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
  hr() {
    return <hr className="my-8 border-zinc-800" />;
  },
};

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        components={components}
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
