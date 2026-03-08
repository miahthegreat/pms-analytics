"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/kpi-card";
import { mockProperties } from "@/lib/data/mock";
import { getPortfolioTotals, getUnitsByProperty } from "@/lib/data/aggregates";
import { RevenueByPropertyChart } from "@/components/revenue-by-property-chart";
import { UnitsByPropertyChart } from "@/components/units-by-property-chart";
import { getRevenueByProperty } from "@/lib/data/aggregates";

const currentYear = 2024;
const ytdMonths = 9;
const stagger = (ms: number) => ({ animationDelay: `${ms}ms`, animationFillMode: "backwards" as const });

export function PropertiesClient() {
  const totals = getPortfolioTotals();
  const revenueByProperty = getRevenueByProperty(currentYear, ytdMonths);
  const unitsByProperty = getUnitsByProperty();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="animate-fade-in-up" style={stagger(60)}>
          <KpiCard title="Properties" value={totals.propertyCount} format="number" iconName="Building2" />
        </div>
        <div className="animate-fade-in-up" style={stagger(120)}>
          <KpiCard title="Total units" value={totals.totalUnits} format="number" iconName="DoorOpen" />
        </div>
        <div className="animate-fade-in-up" style={stagger(180)}>
          <KpiCard title="Total sq ft" value={totals.totalSqFt} format="number" iconName="Building2" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="animate-chart-reveal" style={stagger(240)}>
          <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Revenue by property (YTD)</CardTitle>
              <CardDescription>Portfolio breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueByPropertyChart data={revenueByProperty} />
            </CardContent>
          </Card>
        </div>
        <div className="animate-chart-reveal" style={stagger(300)}>
          <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Units by property</CardTitle>
              <CardDescription>Unit count per property</CardDescription>
            </CardHeader>
            <CardContent>
              <UnitsByPropertyChart data={unitsByProperty} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="animate-fade-in-up" style={stagger(360)}>
        <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
          <CardHeader>
            <CardTitle className="text-base font-semibold">All properties</CardTitle>
            <CardDescription>Portfolio properties and key metrics</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Sq ft</TableHead>
                  <TableHead>Year built</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProperties.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.address}</TableCell>
                    <TableCell>{p.city}, {p.state}</TableCell>
                    <TableCell>{p.unitCount}</TableCell>
                    <TableCell>{p.totalSqFt.toLocaleString()}</TableCell>
                    <TableCell>{p.yearBuilt}</TableCell>
                    <TableCell>
                      <Badge variant={p.status === "active" ? "default" : "secondary"}>
                        {p.status}
                      </Badge>
                    </TableCell>
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
