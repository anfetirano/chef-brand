type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden bg-surface">
        {children}
      </div>
    </div>
  );
}
