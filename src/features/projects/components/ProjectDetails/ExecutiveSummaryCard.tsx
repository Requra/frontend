import { Sparkles } from "lucide-react";

export const ExecutiveSummaryCard = () => {
  return (
    <div className="bg-primary-50/50 border border-primary-100/50 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-sm">
      {/* Decorative background glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-400/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 text-primary-600 ring-4 ring-primary-50">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold text-primary-900 tracking-tight uppercase">
          Executive Summary
        </h3>
      </div>
      <p className="text-neutral-700 leading-relaxed max-w-3xl text-[15px] font-medium">
        The consolidation of Project Alpha is complete. The transition from legacy rails to the unified microservices
        architecture has been fully mapped, with all 42 bottleneck dependencies resolved
        and validated against current compliance standards. The project
        is ready for full-scale modernization deployment.
      </p>
    </div>
  );
};
