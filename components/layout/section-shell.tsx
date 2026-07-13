type SectionShellProps = {
  id: string;
  heading: string;
  summary?: string;
  children: React.ReactNode;
};

export function SectionShell({
  id,
  heading,
  summary,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="border-t border-border py-8 md:py-10">
      <div className="grid gap-5 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
        <div className="space-y-2 pr-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {heading}
          </h2>
          {summary ? (
            <p className="max-w-xs text-sm leading-6 text-muted">{summary}</p>
          ) : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
