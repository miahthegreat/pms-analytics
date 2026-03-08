import { OverviewClient } from "@/components/overview-client";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          YTD and YoY comparisons · {new Date().getFullYear()} analytics
        </p>
      </div>
      <OverviewClient />
    </div>
  );
}
