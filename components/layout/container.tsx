import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** default: 1080px 목록·인덱스, narrow: 720px 글 본문·폼 */
  size?: "default" | "narrow";
}

export function Container({
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        size === "narrow" ? "max-w-[720px]" : "max-w-[1080px]",
        className,
      )}
      {...props}
    />
  );
}
