import { PageHeader } from "@/components/page-header";
import { OverviewClient } from "@/components/overview-client";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        subtitle={`YTD and YoY comparisons · ${new Date().getFullYear()} analytics`}
      />
      <OverviewClient />
    </div>
  );
}
