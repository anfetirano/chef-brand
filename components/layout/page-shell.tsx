type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="w-full">
      <div className="overflow-hidden bg-surface">
        {children}
      </div>
    </div>
  );
}
