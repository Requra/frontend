import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  currentLanguage: "en" | "ar";
  onLanguageChange: (lang: "en" | "ar") => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[
        { id: "en", label: "English" },
        { id: "ar", label: "العربية" },
      ].map((lang) => (
        <button
          key={lang.id}
          onClick={() => onLanguageChange(lang.id as "en" | "ar")}
          className={cn(
            "relative group flex items-center justify-center h-14 rounded-2xl transition-all duration-300 overflow-hidden border cursor-pointer",
            currentLanguage === lang.id
              ? "border-primary-500 bg-primary-50/30 text-primary-700 shadow-md shadow-primary-500/5"
              : "border-white/60 bg-white/50 text-neutral-500 hover:border-primary-200 hover:bg-white shadow-sm"
          )}
        >
          {currentLanguage === lang.id && (
            <motion.div
              layoutId="active-lang"
              className="absolute inset-0 bg-linear-to-tr from-primary-500/10 to-primary-200/10"
              initial={false}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 font-bold tracking-wide">
            {lang.label}
          </span>
          {currentLanguage === lang.id && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary-500"
            />
          )}
        </button>
      ))}
    </div>
  );
};
