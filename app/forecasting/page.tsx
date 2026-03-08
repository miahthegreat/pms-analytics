import { PageShell } from "@/components/page-shell";
import { ForecastingClient } from "@/components/forecasting-client";

export default function ForecastingPage() {
  return (
    <PageShell
      title="Forecasting"
      subtitle="Submit and lock quarterly forecasts (Q1F–Q3F) and annual budget. Locked numbers are used for variance reporting."
    >
      <div className="space-y-8">
        <ForecastingClient />
      </div>
    </PageShell>
  );
}
