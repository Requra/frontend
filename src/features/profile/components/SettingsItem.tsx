import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
  className?: string;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  label,
  value,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 bg-white hover:bg-neutral-50 transition-all duration-200 rounded-2xl group",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-primary-50 text-primary-500 rounded-xl group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <div className="text-left">
          <p className="text-body-md font-bold text-neutral-800 leading-tight">
            {label}
          </p>
          {value && (
            <p className="text-caption text-neutral-400 mt-0.5">{value}</p>
          )}
        </div>
      </div>
      <ChevronRight size={20} className="text-neutral-300 group-hover:text-primary-400 transition-colors" />
    </button>
  );
};
