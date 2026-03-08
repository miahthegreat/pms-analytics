"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const config = {
  units: { label: "Units", color: "var(--chart-2)" },
  label: { label: "Property" },
} satisfies ChartConfig;

interface UnitsByPropertyChartProps {
  data: { name: string; units: number }[];
}

export function UnitsByPropertyChart({ data }: UnitsByPropertyChartProps) {
  return (
    <ChartContainer config={config} className="h-[200px] w-full sm:h-[240px] md:h-[260px]">
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 12 }} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={100} />
        <ChartTooltip content={<ChartTooltipContent formatter={(v) => [Number(v).toLocaleString(), "Units"]} />} />
        <Bar dataKey="units" fill="var(--color-units)" radius={[0, 4, 4, 0]} animationBegin={200} animationDuration={500} />
      </BarChart>
    </ChartContainer>
  );
}
