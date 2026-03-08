import { PageHeader } from "@/components/page-header";
import { PropertiesClient } from "@/components/properties-client";

export default function PropertiesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Properties"
        subtitle="Portfolio properties and key metrics"
      />
      <PropertiesClient />
    </div>
  );
}
