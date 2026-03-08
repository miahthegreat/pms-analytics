import { PageShell } from "@/components/page-shell";
import { OverviewClient } from "@/components/overview-client";

export default function DashboardPage() {
  return (
    <PageShell
      title="Overview"
      subtitle={`YTD and YoY comparisons · ${new Date().getFullYear()} analytics`}
    >
      <div className="space-y-8">
        <OverviewClient />
      </div>
    </PageShell>
  );
}
