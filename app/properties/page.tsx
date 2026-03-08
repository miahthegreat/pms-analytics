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
import { mockProperties } from "@/lib/data/mock";

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Properties</h1>
        <p className="text-muted-foreground">
          Portfolio properties and key metrics
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All properties</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-0">
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
  );
}
