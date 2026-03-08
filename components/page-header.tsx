export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="space-y-0.5 sm:space-y-1">
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
      <p className="text-xs text-muted-foreground sm:text-sm">
        {subtitle}
      </p>
    </header>
  );
}
