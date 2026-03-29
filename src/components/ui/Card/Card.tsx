import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-3xl border border-neutral-100 bg-white text-neutral-950 shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

export { Card }
