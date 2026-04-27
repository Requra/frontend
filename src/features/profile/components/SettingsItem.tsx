import React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 bg-white/50 border border-white/60 hover:bg-white hover:border-primary-100 transition-all duration-300 rounded-2xl group cursor-pointer shadow-sm hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <motion.div 
          whileHover={{ rotate: [0, -10, 10, 0] }}
          className="p-3 bg-primary-50/50 text-primary-600 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-inner"
        >
          {icon}
        </motion.div>
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
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight
          size={20}
          className="text-primary-400"
        />
      </motion.div>
      <ChevronRight
        size={20}
        className="text-neutral-300 group-hover:hidden transition-all"
      />
    </motion.button>
  );
}
