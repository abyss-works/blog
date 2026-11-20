import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/layout/eyebrow";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 제목 오른쪽에 놓을 보조 정보나 액션 */
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-7 border-b border-border pt-10 pb-6",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow className="mb-2.5 text-mineral">{eyebrow}</Eyebrow>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[clamp(1.5rem,2.8vw,1.8125rem)] leading-tight font-semibold tracking-[-0.03em] text-foreground break-words">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-[52ch] text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
