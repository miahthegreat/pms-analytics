import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/kpi-card";
import {
  getRevenueYtd,
  getExpensesYtd,
  getNoiYtd,
  getOccupancy,
  getChurnProxy,
  getPropertyCount,
  getUnitCount,
  getRevenueByMonth,
} from "@/lib/data/aggregates";
import { compareYtd } from "@/lib/analytics";
import { RevenueChart } from "@/components/revenue-chart";

export default function DashboardPage() {
  const revenueYtd = getRevenueYtd();
  const expensesYtd = getExpensesYtd();
  const noiYtd = getNoiYtd();
  const occupancy = getOccupancy();
  const churn = getChurnProxy();

  const revComparison = compareYtd(revenueYtd.current, revenueYtd.prior);
  const expComparison = compareYtd(expensesYtd.current, expensesYtd.prior);
  const noiComparison = compareYtd(noiYtd.current, noiYtd.prior);

  const revenueByMonth = getRevenueByMonth(2024);

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Revenue (YTD)"
          value={revenueYtd.current}
          comparison={revComparison}
          iconName="DollarSign"
        />
        <KpiCard
          title="Expenses (YTD)"
          value={expensesYtd.current}
          comparison={expComparison}
          iconName="Receipt"
        />
        <KpiCard
          title="NOI (YTD)"
          value={noiYtd.current}
          comparison={noiComparison}
          iconName="TrendingUp"
        />
        <KpiCard
          title="Properties"
          value={getPropertyCount()}
          format="number"
          iconName="Building2"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <KpiCard
          title="Occupancy"
          value={occupancy.occupancyPct}
          format="percent"
          description={`${occupancy.occupied} / ${occupancy.total} units occupied`}
          iconName="DoorOpen"
        />
        <KpiCard
          title="Churn (proxy)"
          value={churn.churnRatePct}
          format="percent"
          description={`${churn.moveOuts} units vacant/notice of ${churn.total}`}
          iconName="Users"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Revenue by month (YTD)</CardTitle>
          <CardDescription>Actual revenue · current year</CardDescription>
        </CardHeader>
        <CardContent>
          <RevenueChart data={revenueByMonth} />
        </CardContent>
      </Card>
    </div>
  );
}
