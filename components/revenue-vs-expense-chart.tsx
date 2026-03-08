"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const config = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  expenses: { label: "Expenses", color: "var(--chart-5)" },
  label: { label: "Month" },
} satisfies ChartConfig;

interface RevenueVsExpenseChartProps {
  data: { label: string; revenue: number; expenses: number }[];
}

export function RevenueVsExpenseChart({ data }: RevenueVsExpenseChartProps) {
  return (
    <ChartContainer config={config} className="h-[280px] w-full">
      <AreaChart data={data} margin={{ left: 12, right: 12 }}>
        <defs>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-expenses)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-expenses)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(v, name) => [`$${Number(v).toLocaleString()}`, name === "revenue" ? "Revenue" : "Expenses"]}
            />
          }
        />
        <Area type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} fill="url(#fillRevenue)" animationBegin={150} animationDuration={600} />
        <Area type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2} fill="url(#fillExpenses)" animationBegin={300} animationDuration={600} />
      </AreaChart>
    </ChartContainer>
  );
}
