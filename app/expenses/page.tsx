import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockExpenses, mockProperties } from "@/lib/data/mock";
import { getExpensesYtd } from "@/lib/data/aggregates";
import { compareYtd, formatCurrency, formatPercent } from "@/lib/analytics";

export default function ExpensesPage() {
  const ytd = getExpensesYtd();
  const comp = compareYtd(ytd.current, ytd.prior);

  const byCategory = Object.entries(
    mockExpenses
      .filter((e) => e.year === 2024 && (e.month ?? 0) <= 9)
      .reduce<Record<string, number>>((acc, e) => {
        acc[e.category] = (acc[e.category] ?? 0) + e.amount;
        return acc;
      }, {})
  ).map(([category, amount]) => ({ category, amount }));

  const byProperty = mockProperties.map((p) => {
    const exp = mockExpenses.filter((e) => e.propertyId === p.id && e.year === 2024 && (e.month ?? 0) <= 9);
    const total = exp.reduce((s, e) => s + e.amount, 0);
    return { name: p.name, total };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Expenses</h1>
        <p className="text-muted-foreground">
          Actuals and YTD comparison by category and property
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Expenses YTD</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(ytd.current)}</p>
          <p className={comp.changePct >= 0 ? "text-red-600" : "text-emerald-600"}>
            {formatPercent(comp.changePct)} vs prior YTD
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>By category (YTD)</CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-0">
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {byCategory.map((row) => (
                    <TableRow key={row.category}>
                      <TableCell className="font-medium capitalize">{row.category}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>By property (YTD)</CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-0">
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {byProperty.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
