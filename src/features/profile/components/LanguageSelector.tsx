import React from "react";
import { Button } from "@/components/ui/Button/Button";
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
    <div className="mt-8">
      <h3 className="text-body-md font-bold text-neutral-800 mb-4">Language Preference</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant={currentLanguage === "en" ? "default" : "outline"}
          onClick={() => onLanguageChange("en")}
          className={cn(
            "rounded-2xl",
            currentLanguage === "en" ? "text-white" : "text-primary-700"
          )}
        >
          English
        </Button>
        <Button
          variant={currentLanguage === "ar" ? "default" : "secondary"}
          onClick={() => onLanguageChange("ar")}
          className={cn(
            "rounded-2xl",
            currentLanguage === "ar" ? "text-white" : "text-primary-700"
          )}
        >
          Arabic
        </Button>
      </div>
    </div>
  );
};
