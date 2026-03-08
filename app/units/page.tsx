import { PageShell } from "@/components/page-shell";
import { UnitsClient } from "@/components/units-client";

export default function UnitsPage() {
  return (
    <PageShell title="Units" subtitle="Unit-level status, rent target, and occupancy">
      <div className="space-y-8">
        <UnitsClient />
      </div>
    </PageShell>
  );
}
