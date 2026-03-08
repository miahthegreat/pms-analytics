"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const config = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  label: { label: "Property" },
} satisfies ChartConfig;

interface RevenueByPropertyChartProps {
  data: { name: string; revenue: number }[];
}

export function RevenueByPropertyChart({ data }: RevenueByPropertyChartProps) {
  return (
    <ChartContainer config={config} className="h-[200px] w-full sm:h-[240px] md:h-[260px]">
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 12 }} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={100} />
        <ChartTooltip content={<ChartTooltipContent formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]} />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[0, 4, 4, 0]} animationBegin={200} animationDuration={500} />
      </BarChart>
    </ChartContainer>
  );
}
