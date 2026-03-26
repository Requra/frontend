import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  subtext: string;
  iconBgColor: string;
  iconColor: string;
}

export const StatCard = ({
  icon,
  value,
  label,
  subtext,
  iconBgColor,
  iconColor,
}: StatCardProps) => {
  return (
    <div className="bg-white rounded-3xl p-6 flex flex-col justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
      <div className="flex items-center gap-5 mb-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBgColor, color: iconColor }}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-4xl font-bold text-neutral-800 leading-tight">{value}</h3>
          <p className="text-sm font-medium text-neutral-500">{label}</p>
        </div>
      </div>
      <p className="text-xs text-neutral-400 font-medium pl-1">{subtext}</p>
    </div>
  );
};
