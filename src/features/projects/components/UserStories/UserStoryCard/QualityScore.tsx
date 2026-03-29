import { cn } from "@/lib/utils";

const getScoreColor = (score: number) => {
  if (score >= 90) return "border-indigo-400 text-indigo-600 bg-indigo-50/50";
  if (score >= 70) return "border-primary-400 text-primary-600 bg-primary-50/50";
  return "border-orange-400 text-orange-500 bg-orange-50/50";
};

export const QualityScore = ({ score }: { score: number }) => (
  <div className="flex items-center gap-3">
    <div
      className={cn(
        "w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 duration-300",
        getScoreColor(score)
      )}
    >
      {score}
    </div>
    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
      Quality Score
    </span>
  </div>
);
