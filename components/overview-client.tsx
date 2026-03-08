"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/kpi-card";
import {
  getRevenueYtd,
  getExpensesYtd,
  getNoiYtd,
  getOccupancy,
  getChurnProxy,
  getPropertyCount,
  getRevenueByMonth,
  getExpensesByCategory,
  getRevenueVsExpenseByMonth,
  getRevenueByProperty,
} from "@/lib/data/aggregates";
import { compareYtd } from "@/lib/analytics";
import { RevenueChart } from "@/components/revenue-chart";
import { ExpensesPieChart } from "@/components/expenses-pie-chart";
import { RevenueVsExpenseChart } from "@/components/revenue-vs-expense-chart";
import { RevenueByPropertyChart } from "@/components/revenue-by-property-chart";
import { Skeleton } from "@/components/ui/skeleton";

const currentYear = 2024;
const ytdMonths = 9;

export function OverviewClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[120px] rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-[120px] rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-[320px] rounded-2xl" />
          <Skeleton className="h-[320px] rounded-2xl" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-[320px] rounded-2xl" />
          <Skeleton className="h-[320px] rounded-2xl" />
        </div>
      </div>
    );
  }

  const revenueYtd = getRevenueYtd();
  const expensesYtd = getExpensesYtd();
  const noiYtd = getNoiYtd();
  const occupancy = getOccupancy();
  const churn = getChurnProxy();

  const revComparison = compareYtd(revenueYtd.current, revenueYtd.prior);
  const expComparison = compareYtd(expensesYtd.current, expensesYtd.prior);
  const noiComparison = compareYtd(noiYtd.current, noiYtd.prior);

  const revenueByMonth = getRevenueByMonth(currentYear);
  const expensesByCategory = getExpensesByCategory(currentYear, ytdMonths);
  const revenueVsExpense = getRevenueVsExpenseByMonth(currentYear);
  const revenueByProperty = getRevenueByProperty(currentYear, ytdMonths);

  const stagger = (ms: number) => ({ animationDelay: `${ms}ms`, animationFillMode: "backwards" as const });

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="animate-fade-in-up" style={stagger(60)}>
          <KpiCard title="Revenue (YTD)" value={revenueYtd.current} comparison={revComparison} iconName="DollarSign" />
        </div>
        <div className="animate-fade-in-up" style={stagger(120)}>
          <KpiCard title="Expenses (YTD)" value={expensesYtd.current} comparison={expComparison} iconName="Receipt" />
        </div>
        <div className="animate-fade-in-up" style={stagger(180)}>
          <KpiCard title="NOI (YTD)" value={noiYtd.current} comparison={noiComparison} iconName="TrendingUp" />
        </div>
        <div className="animate-fade-in-up" style={stagger(240)}>
          <KpiCard title="Properties" value={getPropertyCount()} format="number" iconName="Building2" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="animate-fade-in-up" style={stagger(320)}>
          <KpiCard
            title="Occupancy"
            value={occupancy.occupancyPct}
            format="percent"
            description={`${occupancy.occupied} / ${occupancy.total} units occupied`}
            iconName="DoorOpen"
          />
        </div>
        <div className="animate-fade-in-up" style={stagger(380)}>
          <KpiCard
            title="Churn (proxy)"
            value={churn.churnRatePct}
            format="percent"
            description={`${churn.moveOuts} units vacant/notice of ${churn.total}`}
            iconName="Users"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="animate-chart-reveal" style={stagger(440)}>
          <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Revenue by month (YTD)</CardTitle>
              <CardDescription>Actual revenue · current year</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart data={revenueByMonth} />
            </CardContent>
          </Card>
        </div>
        <div className="animate-chart-reveal" style={stagger(500)}>
          <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Revenue vs expenses</CardTitle>
              <CardDescription>Monthly trend · {currentYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueVsExpenseChart data={revenueVsExpense} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="animate-chart-reveal" style={stagger(560)}>
          <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Expenses by category (YTD)</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpensesPieChart data={expensesByCategory} />
            </CardContent>
          </Card>
        </div>
        <div className="animate-chart-reveal" style={stagger(620)}>
          <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Revenue by property (YTD)</CardTitle>
              <CardDescription>Portfolio breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueByPropertyChart data={revenueByProperty} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
