import { PageHeader } from "@/components/page-header";
import { RevenueClient } from "@/components/revenue-client";

export default function RevenuePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Revenue"
        subtitle="Actuals, YTD and YoY comparisons"
      />
      <RevenueClient />
    </div>
  );
}
