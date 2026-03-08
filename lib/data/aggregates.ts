import { mockRevenue, mockExpenses, mockProperties, mockUnits } from "./mock";

const currentYear = 2024;
const priorYear = 2023;
const ytdMonths = 9; // Jan–Sep

function sumRevenue(records: typeof mockRevenue, year: number, throughMonth?: number): number {
  return records
    .filter(
      (r) =>
        r.year === year &&
        r.source === "actual" &&
        (throughMonth == null || (r.month != null && r.month <= throughMonth))
    )
    .reduce((s, r) => s + r.amount, 0);
}

function sumExpenses(records: typeof mockExpenses, year: number, throughMonth?: number): number {
  return records
    .filter(
      (e) =>
        e.year === year &&
        (throughMonth == null || (e.month != null && e.month <= throughMonth))
    )
    .reduce((s, e) => s + e.amount, 0);
}

export function getRevenueYtd() {
  const current = sumRevenue(mockRevenue, currentYear, ytdMonths);
  const prior = sumRevenue(mockRevenue, priorYear, ytdMonths);
  return { current, prior };
}

export function getRevenueYoy(month?: number) {
  const m = month ?? ytdMonths;
  const current = sumRevenue(mockRevenue, currentYear, m);
  const prior = sumRevenue(mockRevenue, priorYear, m);
  return { current, prior };
}

export function getExpensesYtd() {
  const current = sumExpenses(mockExpenses, currentYear, ytdMonths);
  const prior = sumExpenses(mockExpenses, priorYear, ytdMonths);
  return { current, prior };
}

export function getExpensesYoy(month?: number) {
  const m = month ?? ytdMonths;
  const current = sumExpenses(mockExpenses, currentYear, m);
  const prior = sumExpenses(mockExpenses, priorYear, m);
  return { current, prior };
}

export function getNoiYtd() {
  const rev = getRevenueYtd();
  const exp = getExpensesYtd();
  return {
    current: rev.current - exp.current,
    prior: rev.prior - exp.prior,
  };
}

export function getOccupancy() {
  const total = mockUnits.length;
  const occupied = mockUnits.filter((u) => u.status === "occupied").length;
  const vacant = mockUnits.filter((u) => u.status === "vacant").length;
  const notice = mockUnits.filter((u) => u.status === "notice").length;
  return {
    total,
    occupied,
    vacant,
    notice,
    occupancyPct: total ? (occupied / total) * 100 : 0,
  };
}

// Simple churn: move-outs in period (we don't have move-in/out dates in mock; use notice + vacant as proxy)
export function getChurnProxy() {
  const total = mockUnits.length;
  const moveOuts = mockUnits.filter((u) => u.status === "notice" || u.status === "vacant").length;
  return {
    moveOuts,
    total,
    churnRatePct: total ? (moveOuts / total) * 100 : 0,
  };
}

export function getPropertyCount() {
  return mockProperties.length;
}

export function getUnitCount() {
  return mockUnits.length;
}

// Monthly series for charts (revenue by month, current year)
export function getRevenueByMonth(year: number) {
  const byMonth: Record<number, number> = {};
  for (let m = 1; m <= 12; m++) byMonth[m] = 0;
  mockRevenue
    .filter((r) => r.year === year && r.source === "actual" && r.month != null)
    .forEach((r) => {
      byMonth[r.month!] = (byMonth[r.month!] ?? 0) + r.amount;
    });
  return Object.entries(byMonth).map(([month, value]) => ({
    month: Number(month),
    label: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][Number(month) - 1],
    revenue: value,
  }));
}
