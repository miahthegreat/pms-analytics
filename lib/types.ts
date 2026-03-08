// Property Management System — core types
// Designed to map to a future DB (e.g. Prisma/Drizzle)

export type ForecastPeriod = "Q1F" | "Q2F" | "Q3F" | "Q4F" | "BUDGET";
export type ForecastStatus = "draft" | "submitted" | "locked";

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  unitCount: number;
  totalSqFt: number;
  yearBuilt: number;
  status: "active" | "inactive" | "development";
}

export interface Unit {
  id: string;
  propertyId: string;
  name: string;
  beds: number;
  baths: number;
  sqFt: number;
  rentTarget: number;
  status: "occupied" | "vacant" | "down" | "notice";
  occupiedAt?: string; // ISO date
  leaseEnd?: string;
}

export interface RevenueRecord {
  id: string;
  propertyId: string;
  unitId?: string;
  period: string; // "YYYY-MM" or "YYYY-Q1" etc
  year: number;
  month?: number;
  quarter?: number;
  category: "rent" | "fees" | "other";
  amount: number;
  source: "actual" | "forecast" | "budget";
  forecastPeriod?: ForecastPeriod;
}

export interface ExpenseRecord {
  id: string;
  propertyId: string;
  period: string;
  year: number;
  month?: number;
  quarter?: number;
  category: string; // "utilities" | "maintenance" | "management" | "insurance" | "taxes" | "other"
  amount: number;
  source: "actual" | "forecast" | "budget";
  forecastPeriod?: ForecastPeriod;
}

export interface ForecastSnapshot {
  id: string;
  period: ForecastPeriod;
  fiscalYear: number;
  status: ForecastStatus;
  submittedAt?: string;
  lockedAt?: string;
  revenueByProperty: Record<string, number>;
  expenseByProperty: Record<string, number>;
  notes?: string;
}

// Comparison helpers — period labels
export type ComparisonType = "yoy" | "ytd" | "period" | "churn";

export interface ComparisonResult<T = number> {
  current: T;
  prior: T;
  change: number;
  changePct: number;
  label: string;
  type: ComparisonType;
}

export interface ChurnMetric {
  moveOuts: number;
  moveIns: number;
  churnRate: number;
  period: string;
  priorPeriod?: string;
}
