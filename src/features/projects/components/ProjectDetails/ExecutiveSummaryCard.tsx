import { Sparkles } from "lucide-react";

export const ExecutiveSummaryCard = () => {
  return (
    <div className="bg-primary-50 rounded-2xl p-6 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary-600" />
        <h3 className="text-sm font-bold text-primary-800">
          Executive Summary
        </h3>
      </div>
      <p className="text-neutral-700 leading-relaxed max-w-2xl text-sm font-medium">
        The consolidation of Project Alpha is complete. The transition from legacy rails to the unified microservices
        architecture has been fully mapped, with all 42 bottleneck dependencies resolved
        and validated against current compliance standards. The project
        is ready for full-scale modernization deployment.
      </p>
    </div>
  );
};
