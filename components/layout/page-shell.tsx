type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1600px] overflow-hidden bg-surface">
        {children}
      </div>
    </div>
  );
}
