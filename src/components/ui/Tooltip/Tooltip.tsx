import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const Tooltip = ({ content, children, position = "right", className }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-y-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowStyles = {
    top: "bottom-[-3px] left-1/2 -translate-x-1/2 rotate-45",
    bottom: "top-[-3px] left-1/2 -translate-x-1/2 rotate-45",
    left: "right-[-3px] top-1/2 -translate-y-1/2 rotate-45",
    right: "left-[-3px] top-1/2 -translate-y-1/2 rotate-45",
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute bg-[#2A1B38] text-white text-[10px] font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-100 pointer-events-none animate-in fade-in zoom-in-95 duration-200",
            positionStyles[position],
            className
          )}
        >
          {content}
          <div className={cn("absolute w-1.5 h-1.5 bg-[#2A1B38]", arrowStyles[position])} />
        </div>
      )}
    </div>
  );
};
