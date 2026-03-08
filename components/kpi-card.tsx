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
    <Card
      className={cn(
        "relative overflow-hidden border-l-4 border-l-accent transition-all duration-300 active:scale-[0.99] sm:hover:scale-[1.02] sm:hover:shadow-[var(--shadow-card-hover)]",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 sm:pb-2">
        <CardTitle className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
          {title}
        </CardTitle>
        {Icon ? (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 sm:h-10 sm:w-10 sm:rounded-xl">
            <Icon className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
          </span>
        ) : null}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
          {formatter(value)}
        </div>
        {description && (
          <p className="mt-1.5 text-xs text-muted-foreground">{description}</p>
        )}
        {comparison && (
          <p
            className={cn(
              "mt-1.5 flex items-center gap-1 text-xs font-medium",
              comparison.changePct >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
            )}
          >
            <span>{comparison.label} {formatPercent(comparison.changePct)}</span>
            {format === "currency" && (
              <span className="font-normal text-muted-foreground">
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
