import { PageHeader } from "@/components/page-header";
import { ExpensesClient } from "@/components/expenses-client";

export default function ExpensesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Expenses"
        subtitle="Actuals and YTD comparison by category and property"
      />
      <ExpensesClient />
    </div>
  );
}
