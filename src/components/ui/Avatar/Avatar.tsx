import * as React from "react"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src?: string; fallback?: string }
>(({ className, src, fallback, ...props }, ref) => {
  const [error, setError] = React.useState(false);

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-100 items-center justify-center font-semibold text-neutral-600 text-sm",
        className
      )}
      {...props}
    >
      {src && !error ? (
        <img
          src={src}
          alt="Avatar"
          className="aspect-square h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span>{fallback?.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  )
})
Avatar.displayName = "Avatar"

export { Avatar }
