import { PageHeader } from "@/components/page-header";
import { UnitsClient } from "@/components/units-client";

export default function UnitsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Units"
        subtitle="Unit-level status, rent target, and occupancy"
      />
      <UnitsClient />
    </div>
  );
}
