import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** default: 940px 목록·아티클 셸, narrow: 720px 소개·폼·안내 */
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
        size === "narrow" ? "max-w-[720px]" : "max-w-[940px]",
        className,
      )}
      {...props}
    />
  );
}
