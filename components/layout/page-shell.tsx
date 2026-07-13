type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-8 md:py-8">
      <div className="overflow-hidden border border-border bg-surface shadow-[0_24px_80px_rgba(47,32,18,0.08)]">
        {children}
      </div>
    </div>
  );
}
