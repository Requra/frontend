import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
        primary:
          "bg-primary-50 text-primary-700 hover:bg-primary-100",
        success:
          "bg-green-50 text-green-700 hover:bg-green-100",
        destructive:
          "bg-red-50 text-red-700 hover:bg-red-100",
        outline: "text-neutral-600 border border-neutral-200",
        solid: "bg-primary-600 text-white hover:bg-primary-700",
        extracted:
          "bg-cyan-50 text-cyan-700",
        verified:
          "bg-indigo-50 text-indigo-700",
        flagged:
          "bg-orange-50 text-orange-700",
        warning:
          "bg-red-50/60 text-red-600 border border-red-100",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
