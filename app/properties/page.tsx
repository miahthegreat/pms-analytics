import { PageShell } from "@/components/page-shell";
import { PropertiesClient } from "@/components/properties-client";

export default function PropertiesPage() {
  return (
    <PageShell title="Properties" subtitle="Portfolio properties and key metrics">
      <div className="space-y-8">
        <PropertiesClient />
      </div>
    </PageShell>
  );
}
