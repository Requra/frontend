import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base layout & sizing
        "group peer relative flex size-[18px] shrink-0 items-center justify-center",
        // Shape
        "rounded-sm border-2",
        // Default (unchecked) state
        "border-neutral-300 bg-white",
        // Smooth transitions
        "transition-all duration-200 ease-in-out",
        // Hover (unchecked)
        "hover:border-primary-400 hover:bg-primary-50",
        // Focus ring using primary color
        "outline-none focus-visible:ring-3 focus-visible:ring-primary-500/30 focus-visible:border-primary-500",
        // Checked state — filled with primary-600
        "data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600",
        // Checked hover
        "data-[state=checked]:hover:border-primary-700 data-[state=checked]:hover:bg-primary-700",
        // Indeterminate state
        "data-[state=indeterminate]:border-primary-600 data-[state=indeterminate]:bg-primary-600",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-40",
        // Extended hit area for easier clicking
        "after:absolute after:-inset-2",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-white transition-transform duration-150 ease-in-out group-data-[state=checked]:scale-100 scale-0"
      >
        <CheckIcon strokeWidth={3} className="size-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
