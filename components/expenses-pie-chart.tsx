"use client";

import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const config = {
  utilities: { label: "Utilities", color: "var(--chart-1)" },
  maintenance: { label: "Maintenance", color: "var(--chart-2)" },
  management: { label: "Management", color: "var(--chart-3)" },
  insurance: { label: "Insurance", color: "var(--chart-4)" },
  taxes: { label: "Taxes", color: "var(--chart-5)" },
  other: { label: "Other", color: "var(--chart-2)" },
} satisfies ChartConfig;

const COLOR_KEYS = ["utilities", "maintenance", "management", "insurance", "taxes", "other"] as const;

interface ExpensesPieChartProps {
  data: { name: string; value: number }[];
}

export function ExpensesPieChart({ data }: ExpensesPieChartProps) {
  return (
    <ChartContainer config={config} className="mx-auto h-[200px] w-full sm:h-[240px] md:h-[260px]">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent formatter={(v) => [`$${Number(v).toLocaleString()}`, "Expenses"]} />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          strokeWidth={2}
          animationBegin={200}
          animationDuration={800}
        >
          {data.map((entry, index) => {
            const colorKey = COLOR_KEYS[index % COLOR_KEYS.length];
            return <Cell key={entry.name} fill={`var(--color-${colorKey})`} />;
          })}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
