"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { ComparisonResult } from "@/lib/types";
import { DollarSign, Receipt, Building2, DoorOpen, TrendingUp, Users } from "lucide-react";

const iconMap = {
  DollarSign,
  Receipt,
  Building2,
  DoorOpen,
  TrendingUp,
  Users,
} as const;

type IconName = keyof typeof iconMap;

interface KpiCardProps {
  title: string;
  description?: string;
  value: number;
  comparison?: ComparisonResult;
  format?: "currency" | "percent" | "number";
  iconName?: IconName;
  className?: string;
}

export function KpiCard({
  title,
  description,
  value,
  comparison,
  format = "currency",
  iconName,
  className,
}: KpiCardProps) {
  const Icon = iconName ? iconMap[iconName] : null;
  const formatter =
    format === "currency"
      ? formatCurrency
      : format === "percent"
        ? (n: number) => `${n.toFixed(1)}%`
        : (n: number) => n.toLocaleString();

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatter(value)}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {comparison && (
          <p
            className={cn(
              "text-xs mt-1",
              comparison.changePct >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
            )}
          >
            {comparison.label} {formatPercent(comparison.changePct)}
            {format === "currency" && (
              <span className="text-muted-foreground ml-1">
                ({comparison.change >= 0 ? "+" : ""}
                {formatCurrency(comparison.change)})
              </span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
