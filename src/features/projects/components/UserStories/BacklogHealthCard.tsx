import { Badge } from "@/components/ui/Badge/Badge";
import { Activity } from "lucide-react";
import backlogHealthImage from "@/assets/images/Backlog Health Overview.png";

export const BacklogHealthCard = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-neutral-100 bg-linear-to-r from-white via-white to-primary-50/20 p-8 shadow-sm">
      {/* Decorative orb */}
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center gap-8 relative">
        {/* Content */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-50 border border-primary-100/50 flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">
              Backlog Health Overview
            </h3>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
            Your current backlog extraction has an aggregate quality score of{" "}
            <span className="font-bold text-primary-700">76%</span>.
            <br />
            There are{" "}
            <span className="font-bold text-orange-600">
              14 flagged stories
            </span>{" "}
            that require immediate editorial review before verification.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-1">
            <LegendDot
              color="bg-primary-600"
              label="Verified"
              percentage="45%"
            />
            <LegendDot
              color="bg-cyan-400"
              label="Extracted"
              percentage="35%"
            />
            <LegendDot
              color="bg-orange-400"
              label="Flagged"
              percentage="20%"
            />
          </div>
        </div>

        {/* Chart Image with Overlay */}
        <div className="shrink-0 relative group">
          <img
            src={backlogHealthImage}
            alt="Backlog Health Chart"
            className="h-36 w-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay — avg score centered on chart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center bg-white/75 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-sm border border-white/50">
              <span className="text-3xl font-extrabold text-primary-700 leading-none">
                76%
              </span>
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
                Avg Score
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LegendDot = ({
  color,
  label,
  percentage,
}: {
  color: string;
  label: string;
  percentage: string;
}) => (
  <div className="flex items-center gap-2">
    <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
    <span className="text-xs font-semibold text-neutral-600">{label}</span>
    <Badge variant="default" size="sm" className="font-bold">
      {percentage}
    </Badge>
  </div>
);
