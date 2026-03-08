import type {
  Property,
  Unit,
  RevenueRecord,
  ExpenseRecord,
  ForecastSnapshot,
} from "@/lib/types";

export const mockProperties: Property[] = [
  {
    id: "prop-1",
    name: "Riverside Commons",
    address: "1200 River Rd",
    city: "Austin",
    state: "TX",
    zip: "78701",
    unitCount: 48,
    totalSqFt: 62400,
    yearBuilt: 2018,
    status: "active",
  },
  {
    id: "prop-2",
    name: "Oakwood Heights",
    address: "450 Oak Blvd",
    city: "Austin",
    state: "TX",
    zip: "78702",
    unitCount: 24,
    totalSqFt: 28800,
    yearBuilt: 2015,
    status: "active",
  },
  {
    id: "prop-3",
    name: "Lakeside Terrace",
    address: "890 Lake Dr",
    city: "Austin",
    state: "TX",
    zip: "78703",
    unitCount: 36,
    totalSqFt: 43200,
    yearBuilt: 2020,
    status: "active",
  },
];

export const mockUnits: Unit[] = [
  { id: "u-1", propertyId: "prop-1", name: "101", beds: 2, baths: 2, sqFt: 1200, rentTarget: 1850, status: "occupied", occupiedAt: "2023-06-01", leaseEnd: "2025-05-31" },
  { id: "u-2", propertyId: "prop-1", name: "102", beds: 2, baths: 2, sqFt: 1200, rentTarget: 1850, status: "occupied", occupiedAt: "2024-01-15", leaseEnd: "2025-01-14" },
  { id: "u-3", propertyId: "prop-1", name: "103", beds: 1, baths: 1, sqFt: 750, rentTarget: 1200, status: "vacant" },
  { id: "u-4", propertyId: "prop-2", name: "201", beds: 3, baths: 2, sqFt: 1400, rentTarget: 2200, status: "occupied", occupiedAt: "2022-08-01", leaseEnd: "2025-07-31" },
  { id: "u-5", propertyId: "prop-2", name: "202", beds: 2, baths: 2, sqFt: 1200, rentTarget: 1900, status: "notice", occupiedAt: "2023-03-01", leaseEnd: "2025-02-28" },
  { id: "u-6", propertyId: "prop-3", name: "A1", beds: 2, baths: 2, sqFt: 1100, rentTarget: 1750, status: "occupied", occupiedAt: "2024-06-01", leaseEnd: "2025-05-31" },
];

// Revenue: actuals and sample forecast for 2024/2025
function buildRevenue(): RevenueRecord[] {
  const records: RevenueRecord[] = [];
  const props = mockProperties.map((p) => p.id);
  const months2024 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const months2023 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const baseRent: Record<string, number> = { "prop-1": 72000, "prop-2": 42000, "prop-3": 54000 };
  props.forEach((pid) => {
    months2023.forEach((m) => {
      const variance = 0.9 + Math.random() * 0.2;
      records.push({
        id: `rev-${pid}-2023-${m}`,
        propertyId: pid,
        period: `2023-${String(m).padStart(2, "0")}`,
        year: 2023,
        month: m,
        category: "rent",
        amount: Math.round((baseRent[pid] ?? 50000) / 12 * variance),
        source: "actual",
      });
    });
    months2024.forEach((m) => {
      const variance = 0.92 + Math.random() * 0.16;
      records.push({
        id: `rev-${pid}-2024-${m}`,
        propertyId: pid,
        period: `2024-${String(m).padStart(2, "0")}`,
        year: 2024,
        month: m,
        category: "rent",
        amount: Math.round((baseRent[pid] ?? 50000) * 1.03 / 12 * variance),
        source: "actual",
      });
    });
  });
  return records;
}

function buildExpenses(): ExpenseRecord[] {
  const records: ExpenseRecord[] = [];
  const props = mockProperties.map((p) => p.id);
  const categories = ["utilities", "maintenance", "management", "insurance", "taxes"] as const;
  const baseByCat: Record<string, number> = { utilities: 8000, maintenance: 12000, management: 15000, insurance: 6000, taxes: 18000 };
  props.forEach((pid) => {
    [2023, 2024].forEach((y) => {
      const months = y === 2024 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      months.forEach((mo) => {
        categories.forEach((cat) => {
          const variance = 0.85 + Math.random() * 0.3;
          const amt = Math.round((baseByCat[cat] ?? 5000) / 12 * variance);
          records.push({
            id: `exp-${pid}-${y}-${mo}-${cat}`,
            propertyId: pid,
            period: `${y}-${String(mo).padStart(2, "0")}`,
            year: y,
            month: mo,
            category: cat,
            amount: amt,
            source: "actual",
          });
        });
      });
    });
  });
  return records;
}

export const mockRevenue = buildRevenue();
export const mockExpenses = buildExpenses();

export const mockForecasts: ForecastSnapshot[] = [
  {
    id: "fc-q1-25",
    period: "Q1F",
    fiscalYear: 2025,
    status: "locked",
    lockedAt: "2024-10-15T00:00:00Z",
    revenueByProperty: { "prop-1": 225000, "prop-2": 135000, "prop-3": 172500 },
    expenseByProperty: { "prop-1": 125000, "prop-2": 78000, "prop-3": 95000 },
  },
  {
    id: "fc-q2-25",
    period: "Q2F",
    fiscalYear: 2025,
    status: "submitted",
    submittedAt: "2025-01-10T00:00:00Z",
    revenueByProperty: { "prop-1": 232000, "prop-2": 138000, "prop-3": 178000 },
    expenseByProperty: { "prop-1": 128000, "prop-2": 80000, "prop-3": 98000 },
  },
  {
    id: "fc-q3-25",
    period: "Q3F",
    fiscalYear: 2025,
    status: "draft",
    revenueByProperty: { "prop-1": 228000, "prop-2": 136000, "prop-3": 175000 },
    expenseByProperty: { "prop-1": 126000, "prop-2": 79000, "prop-3": 96000 },
  },
  {
    id: "fc-budget-25",
    period: "BUDGET",
    fiscalYear: 2025,
    status: "locked",
    lockedAt: "2024-09-01T00:00:00Z",
    revenueByProperty: { "prop-1": 900000, "prop-2": 540000, "prop-3": 690000 },
    expenseByProperty: { "prop-1": 500000, "prop-2": 312000, "prop-3": 380000 },
  },
];
