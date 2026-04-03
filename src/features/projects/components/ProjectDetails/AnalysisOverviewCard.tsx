import { Card } from "@/components/ui/Card/Card";
import { TrendingUp, FileText, CheckCircle, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
  accent: string;
  iconBg: string;
}

const MetricTile = ({
  icon,
  label,
  value,
  subtitle,
  accent,
  iconBg,
}: MetricCardProps) => (
  <div className="flex flex-col flex-1 py-6 lg:py-0 lg:px-6 first:lg:pl-0 last:lg:pr-0 group">
    <div className="flex items-center gap-2 mb-3">
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 duration-300",
          iconBg
        )}
      >
        {icon}
      </div>
      <span className="text-neutral-500 text-sm font-medium">{label}</span>
    </div>
    <div className="flex items-baseline gap-2 mb-1.5">
      <span
        className={cn(
          "text-4xl font-bold tracking-tight leading-none",
          accent
        )}
      >
        {value}
      </span>
    </div>
    <p className="text-xs text-neutral-400 font-medium leading-relaxed">
      {subtitle}
    </p>
  </div>
);

export const AnalysisOverviewCard = () => {
  return (
    <Card className="p-8 pb-10 relative overflow-hidden">
      {/* Subtle decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-primary-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex justify-between items-center mb-10 relative">
        <h3 className="text-xl font-bold text-neutral-900">
          Analysis Overview
        </h3>
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.15em] bg-neutral-50 px-3 py-1.5 rounded-lg">
          Final Metrics
        </span>
      </div>

      <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-neutral-100 mt-2 relative">
        <MetricTile
          icon={<TrendingUp className="w-4 h-4 text-green-600" />}
          iconBg="bg-green-50 ring-2 ring-green-100/50"
          label="Total Progress"
          value="100%"
          subtitle="All extraction phases complete"
          accent="text-green-500"
        />

        <MetricTile
          icon={<FileText className="w-4 h-4 text-primary-600" />}
          iconBg="bg-primary-50 ring-2 ring-primary-100/50"
          label="Total Requirements"
          value="45"
          subtitle="Verified and Unverified Requirements"
          accent="text-neutral-900"
        />

        <MetricTile
          icon={<CheckCircle className="w-4 h-4 text-indigo-600" />}
          iconBg="bg-indigo-50 ring-2 ring-indigo-100/50"
          label="Approved Requirements"
          value="40"
          subtitle="Human Verified Requirements"
          accent="text-neutral-900"
        />

        <MetricTile
          icon={<Target className="w-4 h-4 text-amber-600" />}
          iconBg="bg-amber-50 ring-2 ring-amber-100/50"
          label="Accuracy"
          value="98%"
          subtitle="Requirements Accuracy"
          accent="text-neutral-900"
        />
      </div>

      {/* Progress bar for Total Progress */}
      <div className="mt-8 relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-neutral-500">
            Overall Progress
          </span>
          <span className="text-xs font-bold text-green-600">100%</span>
        </div>
        <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-green-400 to-green-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </Card>
  );
};
