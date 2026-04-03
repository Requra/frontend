import { cn } from "@/lib/utils";

const RADIUS = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const getScoreColors = (score: number) => {
  if (score >= 90) return { stroke: "stroke-indigo-500", text: "text-indigo-600" };
  if (score >= 70) return { stroke: "stroke-primary-500", text: "text-primary-600" };
  return { stroke: "stroke-orange-400", text: "text-orange-500" };
};

export const QualityScore = ({ score }: { score: number }) => {
  const { stroke, text } = getScoreColors(score);
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-9 h-9">
        <svg
          className="w-9 h-9 -rotate-90"
          viewBox="0 0 36 36"
        >
          {/* Background track */}
          <circle
            cx="18"
            cy="18"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-neutral-100"
          />
          {/* Score arc */}
          <circle
            cx="18"
            cy="18"
            r={RADIUS}
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className={cn(stroke, "transition-[stroke-dashoffset] duration-700 ease-out")}
          />
        </svg>
        {/* Score number centered */}
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center text-xs font-bold",
            text,
          )}
        >
          {score}
        </span>
      </div>
      <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
        Quality Score
      </span>
    </div>
  );
};
