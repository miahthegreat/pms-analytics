import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockUnits, mockProperties } from "@/lib/data/mock";
import { formatCurrency } from "@/lib/analytics";

const statusVariant = (status: string) =>
  status === "occupied" ? "default" : status === "vacant" ? "destructive" : "secondary";

export default function UnitsPage() {
  const propsById = Object.fromEntries(mockProperties.map((p) => [p.id, p]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Units</h1>
        <p className="text-muted-foreground">
          Unit-level status, rent target, and occupancy
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All units</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-0">
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
  );
}
