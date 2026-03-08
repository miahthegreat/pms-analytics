import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockRevenue, mockProperties } from "@/lib/data/mock";
import {
  getRevenueYtd,
  getRevenueYoy,
  getRevenueByMonth,
} from "@/lib/data/aggregates";
import { compareYtd, compareYoY, formatCurrency, formatPercent } from "@/lib/analytics";
import { RevenueChart } from "@/components/revenue-chart";

export default function RevenuePage() {
  const ytd = getRevenueYtd();
  const yoy = getRevenueYoy();
  const ytdComp = compareYtd(ytd.current, ytd.prior);
  const yoyComp = compareYoY(yoy.current, yoy.prior);

  const byProperty = mockProperties.map((p) => {
    const rev = mockRevenue.filter((r) => r.propertyId === p.id && r.source === "actual");
    const currentYtd = rev.filter((r) => r.year === 2024 && (r.month ?? 0) <= 9).reduce((s, r) => s + r.amount, 0);
    const priorYtd = rev.filter((r) => r.year === 2023 && (r.month ?? 0) <= 9).reduce((s, r) => s + r.amount, 0);
    return { name: p.name, currentYtd, priorYtd, changePct: priorYtd ? ((currentYtd - priorYtd) / priorYtd) * 100 : 0 };
  });

  const revenueByMonth = getRevenueByMonth(2024);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Revenue</h1>
        <p className="text-muted-foreground">
          Actuals, YTD and YoY comparisons
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue YTD</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(ytd.current)}</p>
            <p className={ytdComp.changePct >= 0 ? "text-emerald-600" : "text-red-600"}>
              {formatPercent(ytdComp.changePct)} vs prior YTD
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue YoY (through Sep)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(yoy.current)}</p>
            <p className={yoyComp.changePct >= 0 ? "text-emerald-600" : "text-red-600"}>
              {formatPercent(yoyComp.changePct)} vs prior year
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by property (YTD)</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-0">
          <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Current YTD</TableHead>
                  <TableHead>Prior YTD</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {byProperty.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{formatCurrency(row.currentYtd)}</TableCell>
                    <TableCell>{formatCurrency(row.priorYtd)}</TableCell>
                    <TableCell className={row.changePct >= 0 ? "text-emerald-600" : "text-red-600"}>
                      {formatPercent(row.changePct)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by month</CardTitle>
          <CardContent>
            <RevenueChart data={revenueByMonth} />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
