import { PageHeader } from "@/components/page-header";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="shrink-0 px-3 pt-3 pb-2 sm:px-4 sm:pt-4 md:px-6 md:pt-6">
        <PageHeader title={title} subtitle={subtitle} />
      </div>
      <ScrollArea className="min-h-0 min-w-0 flex-1 overflow-hidden">
        <div className="min-w-0 px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}
