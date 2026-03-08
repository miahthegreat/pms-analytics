import { PageShell } from "@/components/page-shell";
import { RevenueClient } from "@/components/revenue-client";

export default function RevenuePage() {
  return (
    <PageShell title="Revenue" subtitle="Actuals, YTD and YoY comparisons">
      <div className="space-y-8">
        <RevenueClient />
      </div>
    </PageShell>
  );
}
