import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { hoverLift, tapScale } from "../constants/motionPresets";

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
  className?: string;
}

export function SettingsItem({
  icon,
  label,
  value,
  onClick,
  className = "",
}: SettingsItemProps) {
  return (
    <motion.button
      whileHover={hoverLift}
      whileTap={tapScale}
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 bg-white border border-neutral-100 hover:border-primary-100 transition-all duration-300 rounded-2xl group cursor-pointer shadow-sm hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary-50/50 text-primary-600 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-inner">
          {icon}
        </div>
        <div className="text-left">
          <p className="text-[15px] font-bold text-neutral-800 leading-tight">
            {label}
          </p>
          {value && (
            <p className="text-xs text-neutral-400 mt-1 font-medium tracking-wide">
              {value}
            </p>
          )}
        </div>
      </div>
      <ChevronRight
        size={20}
        className="text-neutral-300 group-hover:text-primary-400 group-hover:translate-x-1 transition-all duration-200"
      />
    </motion.button>
  );
}
