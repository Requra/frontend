import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex items-center justify-start bg-transparent text-neutral-500 transition-all",
  {
    variants: {
      variant: {
        default: "gap-6 border-b border-neutral-200 w-full pb-px",
        pills: "gap-1 rounded-lg bg-neutral-100 p-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ComponentProps<
  typeof TabsPrimitive.Trigger
> {
  icon?: React.ReactNode;
  badge?: string | number;
}

function TabsTrigger({
  className,
  children,
  icon,
  badge,
  ...props
}: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "group/tabs-trigger relative inline-flex items-center justify-center gap-2 px-1 pb-3 text-sm font-medium whitespace-nowrap transition-all outline-none cursor-pointer select-none",
        "text-neutral-500 hover:text-neutral-700",
        "data-[state=active]:text-primary-600",
        // Underline for 'default' variant (line style)
        "after:absolute after:-bottom-px after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 after:opacity-0 after:transition-opacity",
        "data-[state=active]:after:opacity-100",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="shrink-0 opacity-70 transition-opacity group-data-[state=active]/tabs-trigger:opacity-100">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {badge !== undefined && (
        <span
          className={cn(
            "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold transition-all",
            "bg-neutral-100 text-neutral-600",
            "group-data-[state=active]/tabs-trigger:bg-primary-50 group-data-[state=active]/tabs-trigger:text-primary-700",
          )}
        >
          {badge}
        </span>
      )}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none pt-4", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
