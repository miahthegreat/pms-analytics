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
import { mockExpenses, mockProperties } from "@/lib/data/mock";
import { getExpensesYtd, getExpensesByCategory } from "@/lib/data/aggregates";
import { compareYtd, formatCurrency, formatPercent } from "@/lib/analytics";
import { ExpensesPieChart } from "@/components/expenses-pie-chart";

const currentYear = 2024;
const ytdMonths = 9;
const stagger = (ms: number) => ({ animationDelay: `${ms}ms`, animationFillMode: "backwards" as const });

export function ExpensesClient() {
  const ytd = getExpensesYtd();
  const comp = compareYtd(ytd.current, ytd.prior);
  const expensesByCategory = getExpensesByCategory(currentYear, ytdMonths);

  const byCategory = Object.entries(
    mockExpenses
      .filter((e) => e.year === 2024 && (e.month ?? 0) <= 9)
      .reduce<Record<string, number>>((acc, e) => {
        acc[e.category] = (acc[e.category] ?? 0) + e.amount;
        return acc;
      }, {})
  ).map(([category, amount]) => ({ category, amount }));

  const byProperty = mockProperties.map((p) => {
    const exp = mockExpenses.filter((e) => e.propertyId === p.id && e.year === 2024 && (e.month ?? 0) <= 9);
    const total = exp.reduce((s, e) => s + e.amount, 0);
    return { name: p.name, total };
  });

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <div className="animate-fade-in-up" style={stagger(60)}>
        <KpiCard
          title="Expenses YTD"
          value={ytd.current}
          comparison={comp}
          iconName="Receipt"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="animate-chart-reveal" style={stagger(120)}>
          <Card className="transition-shadow duration-300 sm:hover:shadow-[var(--shadow-card-hover)]">
            <CardHeader className="pb-2 sm:pb-6">
              <CardTitle className="text-sm font-semibold sm:text-base">Expenses by category (YTD)</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpensesPieChart data={expensesByCategory} />
            </CardContent>
          </Card>
        </div>
        <div className="animate-fade-in-up" style={stagger(180)}>
          <Card className="min-w-0 transition-shadow duration-300 sm:hover:shadow-[var(--shadow-card-hover)]">
            <CardHeader className="pb-2 sm:pb-6">
              <CardTitle className="text-sm font-semibold sm:text-base">By category (YTD)</CardTitle>
              <CardDescription>Amount by category</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {byCategory.map((row) => (
                    <TableRow key={row.category}>
                      <TableCell className="font-medium capitalize">{row.category}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="animate-fade-in-up" style={stagger(240)}>
        <Card className="min-w-0 transition-shadow duration-300 sm:hover:shadow-[var(--shadow-card-hover)]">
          <CardHeader className="pb-2 sm:pb-6">
            <CardTitle className="text-sm font-semibold sm:text-base">By property (YTD)</CardTitle>
            <CardDescription>Expenses by property</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {byProperty.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-right">{formatCurrency(row.total)}</TableCell>
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
