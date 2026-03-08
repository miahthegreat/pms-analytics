import { PageHeader } from "@/components/page-header";
import { ForecastingClient } from "@/components/forecasting-client";

export default function ForecastingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Forecasting"
        subtitle="Submit and lock quarterly forecasts (Q1F–Q3F) and annual budget. Locked numbers are used for variance reporting."
      />
      <ForecastingClient />
    </div>
  );
}
