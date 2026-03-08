"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const config = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  label: {
    label: "Month",
  },
} satisfies ChartConfig;

interface RevenueChartProps {
  data: { month: number; label: string; revenue: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ChartContainer config={config} className="h-[280px] w-full">
      <BarChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <ChartTooltip content={<ChartTooltipContent formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]} />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[6, 6, 0, 0]} animationBegin={100} animationDuration={500} />
      </BarChart>
    </ChartContainer>
  );
}
