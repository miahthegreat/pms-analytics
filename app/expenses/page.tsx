import { PageShell } from "@/components/page-shell";
import { ExpensesClient } from "@/components/expenses-client";

export default function ExpensesPage() {
  return (
    <PageShell title="Expenses" subtitle="Actuals and YTD comparison by category and property">
      <div className="space-y-8">
        <ExpensesClient />
      </div>
    </PageShell>
  );
}
