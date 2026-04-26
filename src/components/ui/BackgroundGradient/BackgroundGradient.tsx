import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundGradientProps {
  className?: string;
}

/**
 * Reusable Background Gradient component for Dashboard and Profile pages.
 * Features a fixed purple curved SVG background.
 */
export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ className }) => {
  return (
    <div className={cn(
      "fixed top-0 left-[80px] right-0 z-0 pointer-events-none overflow-hidden h-[439px]",
      className
    )}>
      <svg
        width="100%"
        height="439"
        viewBox="0 0 1440 439"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-[439px]"
      >
        <path
          d="M2405 -7H-154C-104.669 66.2309 -238.624 439 399.899 439C1134.84 439 2113.8 160.407 2405 -7Z"
          fill="url(#paint0_radial_shared)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_shared"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(1125.5 216) scale(1279.5 223)"
          >
            <stop stopColor="var(--color-primary-900)" />
            <stop offset="0.89" stopColor="var(--color-primary-600)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
