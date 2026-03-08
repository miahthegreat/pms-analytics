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
import { mockUnits, mockProperties } from "@/lib/data/mock";
import { getOccupancy, getUnitCount } from "@/lib/data/aggregates";
import { formatCurrency } from "@/lib/analytics";
import { UnitsByPropertyChart } from "@/components/units-by-property-chart";
import { getUnitsByProperty } from "@/lib/data/aggregates";

const statusVariant = (status: string) =>
  status === "occupied" ? "default" : status === "vacant" ? "destructive" : "secondary";

const stagger = (ms: number) => ({ animationDelay: `${ms}ms`, animationFillMode: "backwards" as const });

export function UnitsClient() {
  const propsById = Object.fromEntries(mockProperties.map((p) => [p.id, p]));
  const occupancy = getOccupancy();
  const unitsByProperty = getUnitsByProperty();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="animate-fade-in-up" style={stagger(60)}>
          <KpiCard title="Total units" value={getUnitCount()} format="number" iconName="DoorOpen" />
        </div>
        <div className="animate-fade-in-up" style={stagger(120)}>
          <KpiCard
            title="Occupancy"
            value={occupancy.occupancyPct}
            format="percent"
            description={`${occupancy.occupied} occupied`}
            iconName="DoorOpen"
          />
        </div>
        <div className="animate-fade-in-up" style={stagger(180)}>
          <KpiCard
            title="Vacant / notice"
            value={occupancy.vacant + occupancy.notice}
            format="number"
            description="Units available or moving out"
            iconName="DoorOpen"
          />
        </div>
      </div>

      <div className="animate-chart-reveal" style={stagger(240)}>
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

      <div className="animate-fade-in-up" style={stagger(300)}>
        <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
          <CardHeader>
            <CardTitle className="text-base font-semibold">All units</CardTitle>
            <CardDescription>Unit-level status, rent target, and occupancy</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Unit</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Beds</TableHead>
                  <TableHead>Baths</TableHead>
                  <TableHead>Sq ft</TableHead>
                  <TableHead>Rent target</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Lease end</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUnits.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell>{propsById[u.propertyId]?.name ?? u.propertyId}</TableCell>
                    <TableCell>{u.beds}</TableCell>
                    <TableCell>{u.baths}</TableCell>
                    <TableCell>{u.sqFt}</TableCell>
                    <TableCell>{formatCurrency(u.rentTarget)}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(u.status)}>{u.status}</Badge>
                    </TableCell>
                    <TableCell>{u.leaseEnd ?? "—"}</TableCell>
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
