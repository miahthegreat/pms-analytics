"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KpiCard } from "@/components/kpi-card";
import { mockRevenue, mockProperties } from "@/lib/data/mock";
import {
  getRevenueYtd,
  getRevenueYoy,
  getRevenueByMonth,
  getRevenueByProperty,
  getRevenueVsExpenseByMonth,
} from "@/lib/data/aggregates";
import { compareYtd, compareYoY, formatCurrency, formatPercent } from "@/lib/analytics";
import { RevenueChart } from "@/components/revenue-chart";
import { RevenueVsExpenseChart } from "@/components/revenue-vs-expense-chart";
import { RevenueByPropertyChart } from "@/components/revenue-by-property-chart";

const currentYear = 2024;
const ytdMonths = 9;
const stagger = (ms: number) => ({ animationDelay: `${ms}ms`, animationFillMode: "backwards" as const });

export function RevenueClient() {
  const ytd = getRevenueYtd();
  const yoy = getRevenueYoy();
  const ytdComp = compareYtd(ytd.current, ytd.prior);
  const yoyComp = compareYoY(yoy.current, yoy.prior);

  const byProperty = mockProperties.map((p) => {
    const rev = mockRevenue.filter((r) => r.propertyId === p.id && r.source === "actual");
    const currentYtd = rev.filter((r) => r.year === 2024 && (r.month ?? 0) <= 9).reduce((s, r) => s + r.amount, 0);
    const priorYtd = rev.filter((r) => r.year === 2023 && (r.month ?? 0) <= 9).reduce((s, r) => s + r.amount, 0);
    return { name: p.name, currentYtd, priorYtd, changePct: priorYtd ? ((currentYtd - priorYtd) / priorYtd) * 100 : 0 };
  });

  const revenueByMonth = getRevenueByMonth(currentYear);
  const revenueByProperty = getRevenueByProperty(currentYear, ytdMonths);
  const revenueVsExpense = getRevenueVsExpenseByMonth(currentYear);

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div className="animate-fade-in-up" style={stagger(60)}>
          <KpiCard
            title="Revenue YTD"
            value={ytd.current}
            comparison={ytdComp}
            iconName="DollarSign"
          />
        </div>
        <div className="animate-fade-in-up" style={stagger(120)}>
          <KpiCard
            title="Revenue YoY (through Sep)"
            value={yoy.current}
            comparison={yoyComp}
            iconName="DollarSign"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="animate-chart-reveal" style={stagger(180)}>
          <Card className="transition-shadow duration-300 sm:hover:shadow-[var(--shadow-card-hover)]">
            <CardHeader className="pb-2 sm:pb-6">
              <CardTitle className="text-sm font-semibold sm:text-base">Revenue by month (YTD)</CardTitle>
              <CardDescription>Actual revenue · current year</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart data={revenueByMonth} />
            </CardContent>
          </Card>
        </div>
        <div className="animate-chart-reveal" style={stagger(240)}>
          <Card className="transition-shadow duration-300 sm:hover:shadow-[var(--shadow-card-hover)]">
            <CardHeader className="pb-2 sm:pb-6">
              <CardTitle className="text-sm font-semibold sm:text-base">Revenue vs expenses</CardTitle>
              <CardDescription>Monthly trend · {currentYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueVsExpenseChart data={revenueVsExpense} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="animate-chart-reveal" style={stagger(300)}>
        <Card className="transition-shadow duration-300 sm:hover:shadow-[var(--shadow-card-hover)]">
          <CardHeader className="pb-2 sm:pb-6">
            <CardTitle className="text-sm font-semibold sm:text-base">Revenue by property (YTD)</CardTitle>
            <CardDescription>Portfolio breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueByPropertyChart data={revenueByProperty} />
          </CardContent>
        </Card>
      </div>

      <div className="animate-fade-in-up" style={stagger(360)}>
        <Card className="min-w-0 transition-shadow duration-300 sm:hover:shadow-[var(--shadow-card-hover)]">
          <CardHeader className="pb-2 sm:pb-6">
            <CardTitle className="text-sm font-semibold sm:text-base">Revenue by property (YTD) · table</CardTitle>
            <CardDescription>Current vs prior YTD and change</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Current YTD</TableHead>
                  <TableHead>Prior YTD</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {byProperty.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{formatCurrency(row.currentYtd)}</TableCell>
                    <TableCell>{formatCurrency(row.priorYtd)}</TableCell>
                    <TableCell className={row.changePct >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}>
                      {formatPercent(row.changePct)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
