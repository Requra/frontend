import { Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";

export const ExecutiveSummaryCard = () => {
  const [copied, setCopied] = useState(false);
  const summaryText =
    "The consolidation of Project Alpha is complete. The transition from legacy rails to the unified microservices architecture has been fully mapped, with all 42 bottleneck dependencies resolved and validated against current compliance standards. The project is ready for full-scale modernization deployment.";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-linear-to-br from-primary-50/60 via-white to-indigo-50/30 border border-primary-100/50 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-sm group">
      {/* Decorative background glows */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 relative">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-primary-100 to-primary-200/80 text-primary-600 ring-4 ring-primary-50/80 shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary-900 tracking-tight uppercase">
              Executive Summary
            </h3>
            <span className="text-[10px] font-medium text-primary-400">
              AI-Generated Overview
            </span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary-600 bg-white/60 hover:bg-white border border-primary-100/50 rounded-lg transition-all opacity-0 group-hover:opacity-100 shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      <p className="text-neutral-700 leading-[1.8] max-w-3xl text-[15px] font-medium relative">
        {summaryText}
      </p>
    </div>
  );
};
