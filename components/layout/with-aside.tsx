interface WithAsideProps {
  aside: React.ReactNode;
  asideLabel: string;
  children: React.ReactNode;
}

/** 본문 + 우측 aside. lg 미만에서는 aside가 본문 아래로 쌓인다. */
export function WithAside({ aside, asideLabel, children }: WithAsideProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
      <div className="min-w-0">{children}</div>
      <aside aria-label={asideLabel} className="min-w-0 lg:sticky lg:top-20 lg:self-start">
        {aside}
      </aside>
    </div>
  );
}
