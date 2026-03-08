import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastingTable } from "@/components/forecasting-table";
import { mockForecasts, mockProperties } from "@/lib/data/mock";

export default function ForecastingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Forecasting</h1>
        <p className="text-muted-foreground">
          Submit and lock quarterly forecasts (Q1F–Q3F) and annual budget. Locked numbers are used for variance reporting.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Forecast periods</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Q1F–Q3F: quarterly forecasts. BUDGET: full-year budget (locked at planning). Submit to mark ready for review; Lock to freeze numbers.
          </p>
        </CardContent>
      </Card>

      <ForecastingTable forecasts={mockForecasts} properties={mockProperties} />
    </div>
  );
}
