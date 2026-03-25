import * as React from "react";
import { Check, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stepperVariants = cva("flex w-full", {
  variants: {
    orientation: {
      horizontal: "flex-row justify-between",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const circleVariants = cva(
  "relative flex shrink-0 items-center justify-center rounded-full font-medium z-10 transition-colors",
  {
    variants: {
      size: {
        sm: "h-6 w-6 text-xs border-[1.5px]",
        md: "h-8 w-8 text-sm border-2",
        lg: "h-[66px] w-[66px] text-2xl font-bold border-[3px]",
      },
      state: {
        completed: "border-transparent bg-gradient-steps text-white",
        current: "border-primary-300 bg-primary-50 text-primary-600",
        upcoming: "border-neutral-200 bg-white text-neutral-400",
        error: "border-red-400 bg-red-50 text-red-500",
      },
    },
    defaultVariants: {
      size: "md",
      state: "upcoming",
    },
  },
);

const iconSizes = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-10 w-10",
};

const horizontalLineTop = {
  sm: "top-3",
  md: "top-4",
  lg: "top-[33px]",
};

export type StepItem = {
  title?: string;
  description?: string;
  isError?: boolean;
};

export interface StepperProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  steps: StepItem[];
  activeStep: number;
  size?: VariantProps<typeof circleVariants>["size"];
}

export function Stepper({
  steps,
  activeStep,
  orientation = "horizontal",
  size = "md",
  className,
  ...props
}: StepperProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div className={cn(stepperVariants({ orientation }), className)} {...props}>
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isCurrent = index === activeStep;
        const state = step.isError
          ? "error"
          : isCompleted
            ? "completed"
            : isCurrent
              ? "current"
              : "upcoming";

        const lineTopClass = size
          ? horizontalLineTop[size]
          : horizontalLineTop.md;

        return (
          <div
            key={index}
            className={cn(
              "relative flex",
              isHorizontal
                ? "flex-col items-center flex-1"
                : "flex-row items-start pb-8 last:pb-0",
            )}
          >
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute z-0",
                  isHorizontal
                    ? `left-[50%] right-[-50%] h-[1.5px] ${lineTopClass}`
                    : "top-2 bottom-[-8px] w-[1.5px] left-[11px] sm:left-[11px] md:left-[15px] lg:left-[23px]",
                  isCompleted ? "bg-neutral-300" : "bg-neutral-200",
                )}
                style={
                  !isHorizontal
                    ? {
                        left:
                          size === "sm"
                            ? "11px"
                            : size === "md"
                              ? "15px"
                              : "23px",
                      }
                    : undefined
                }
              />
            )}

            {/* Step Circle */}
            <div className={cn(circleVariants({ size, state }))}>
              {state === "completed" ? (
                <Check className={iconSizes[size || "md"]} strokeWidth={3} />
              ) : state === "error" ? (
                <X className={iconSizes[size || "md"]} strokeWidth={3} />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            {/* Step Content */}
            {(step.title || step.description) && (
              <div
                className={cn(
                  "flex flex-col",
                  isHorizontal
                    ? "mt-3 items-center text-center px-2"
                    : "ml-4 mt-1",
                )}
              >
                {step.title && (
                  <span
                    className={cn(
                      "font-semibold",
                      size === "sm"
                        ? "text-xs"
                        : size === "md"
                          ? "text-sm"
                          : "text-base",
                      state === "current" && "text-primary-600",
                      state === "upcoming" && "text-neutral-500",
                      state === "error" && "text-red-600",
                      state === "completed" && "text-primary-800",
                    )}
                  >
                    {step.title}
                  </span>
                )}
                {step.description && (
                  <span
                    className={cn(
                      "text-neutral-500 mt-1",
                      size === "sm"
                        ? "text-[10px]"
                        : size === "md"
                          ? "text-xs"
                          : "text-sm",
                    )}
                  >
                    {step.description}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
