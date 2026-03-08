"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/analytics";
import type { Property, ForecastSnapshot, ForecastStatus } from "@/lib/types";
import { Lock, Send } from "lucide-react";

interface ForecastingTableProps {
  forecasts: ForecastSnapshot[];
  properties: Property[];
}

export function ForecastingTable({ forecasts, properties }: ForecastingTableProps) {
  const [snapshots, setSnapshots] = useState<ForecastSnapshot[]>(forecasts);

  const updateStatus = (id: string, status: ForecastStatus) => {
    setSnapshots((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              status,
              ...(status === "submitted" && { submittedAt: new Date().toISOString() }),
              ...(status === "locked" && { lockedAt: new Date().toISOString() }),
            }
          : f
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast snapshots</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Revenue and expense totals by property per period. Use Submit to mark draft as ready; Lock to freeze (no further edits).
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>FY</TableHead>
              <TableHead>Status</TableHead>
              {properties.map((p) => (
                <TableHead key={p.id} className="text-right">
                  {p.name} (Rev)
                </TableHead>
              ))}
              <TableHead className="text-right">Total Rev</TableHead>
              {properties.map((p) => (
                <TableHead key={p.id} className="text-right">
                  {p.name} (Exp)
                </TableHead>
              ))}
              <TableHead className="text-right">Total Exp</TableHead>
              <TableHead className="w-[180px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {snapshots.map((f) => {
              const totalRev = Object.values(f.revenueByProperty).reduce((a, b) => a + b, 0);
              const totalExp = Object.values(f.expenseByProperty).reduce((a, b) => a + b, 0);
              const isLocked = f.status === "locked";
              const isDraft = f.status === "draft";
              return (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.period}</TableCell>
                  <TableCell>{f.fiscalYear}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        f.status === "locked"
                          ? "secondary"
                          : f.status === "submitted"
                            ? "default"
                            : "outline"
                      }
                    >
                      {f.status}
                    </Badge>
                  </TableCell>
                  {properties.map((p) => (
                    <TableCell key={p.id} className="text-right">
                      {formatCurrency(f.revenueByProperty[p.id] ?? 0)}
                    </TableCell>
                  ))}
                  <TableCell className="text-right font-medium">{formatCurrency(totalRev)}</TableCell>
                  {properties.map((p) => (
                    <TableCell key={p.id} className="text-right">
                      {formatCurrency(f.expenseByProperty[p.id] ?? 0)}
                    </TableCell>
                  ))}
                  <TableCell className="text-right font-medium">{formatCurrency(totalExp)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {isDraft && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(f.id, "submitted")}
                        >
                          <Send className="mr-1 h-3 w-3" />
                          Submit
                        </Button>
                      )}
                      {!isLocked && (
                        <Button
                          size="sm"
                          onClick={() => updateStatus(f.id, "locked")}
                          disabled={isDraft}
                          title={isDraft ? "Submit first" : "Lock forecast"}
                        >
                          <Lock className="mr-1 h-3 w-3" />
                          Lock
                        </Button>
                      )}
                      {isLocked && (
                        <span className="text-xs text-muted-foreground">Locked</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
