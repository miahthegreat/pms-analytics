import type { ComparisonResult, ChurnMetric } from "@/lib/types";

export function compareYoY(current: number, prior: number): ComparisonResult {
  const change = current - prior;
  const changePct = prior === 0 ? 0 : (change / prior) * 100;
  return {
    current,
    prior,
    change,
    changePct,
    label: "YoY",
    type: "yoy",
  };
}

export function compareYtd(
  currentYtd: number,
  priorYtd: number
): ComparisonResult {
  const change = currentYtd - priorYtd;
  const changePct = priorYtd === 0 ? 0 : (change / priorYtd) * 100;
  return {
    current: currentYtd,
    prior: priorYtd,
    change,
    changePct,
    label: "YTD",
    type: "ytd",
  };
}

export function comparePeriod(
  current: number,
  prior: number,
  label = "vs prior"
): ComparisonResult {
  const change = current - prior;
  const changePct = prior === 0 ? 0 : (change / prior) * 100;
  return {
    current,
    prior,
    change,
    changePct,
    label,
    type: "period",
  };
}

export function churnRate(moveOuts: number, moveIns: number, totalUnits: number): ChurnMetric {
  const churnRatePct = totalUnits === 0 ? 0 : (moveOuts / totalUnits) * 100;
  return {
    moveOuts,
    moveIns,
    churnRate: churnRatePct,
    period: "current",
  };
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPercent(n: number, decimals = 1): string {
  return `${n >= 0 ? "+" : ""}${n.toFixed(decimals)}%`;
}
