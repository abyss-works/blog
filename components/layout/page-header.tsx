import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/layout/eyebrow";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 제목 오른쪽에 놓을 액션(버튼 등) */
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
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-4 pt-12 pb-6",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
        )}
        <h1 className="text-3xl leading-tight font-bold tracking-tight break-words">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
