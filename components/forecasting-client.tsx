"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/kpi-card";
import { ForecastingTable } from "@/components/forecasting-table";
import { mockForecasts, mockProperties } from "@/lib/data/mock";

const stagger = (ms: number) => ({ animationDelay: `${ms}ms`, animationFillMode: "backwards" as const });

export function ForecastingClient() {
  const lockedCount = mockForecasts.filter((f) => f.status === "locked").length;
  const draftCount = mockForecasts.filter((f) => f.status === "draft").length;
  const submittedCount = mockForecasts.filter((f) => f.status === "submitted").length;

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
        <div className="animate-fade-in-up" style={stagger(60)}>
          <KpiCard title="Locked" value={lockedCount} format="number" iconName="TrendingUp" />
        </div>
        <div className="animate-fade-in-up" style={stagger(120)}>
          <KpiCard title="Submitted" value={submittedCount} format="number" iconName="TrendingUp" />
        </div>
        <div className="animate-fade-in-up" style={stagger(180)}>
          <KpiCard title="Draft" value={draftCount} format="number" iconName="TrendingUp" />
        </div>
      </div>

      <div className="animate-fade-in-up" style={stagger(240)}>
        <Card className="transition-shadow duration-300 sm:hover:shadow-[var(--shadow-card-hover)]">
          <CardHeader className="pb-2 sm:pb-6">
            <CardTitle className="text-sm font-semibold sm:text-base">Forecast periods</CardTitle>
            <CardDescription>
              Q1F–Q3F: quarterly forecasts. BUDGET: full-year budget (locked at planning). Submit to mark ready for review; Lock to freeze numbers.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="animate-chart-reveal" style={stagger(300)}>
        <ForecastingTable forecasts={mockForecasts} properties={mockProperties} />
      </div>
    </div>
  );
}
