import { cn } from "@/lib/utils";

export function ProjectCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-neutral-100 bg-white p-5 shadow-sm overflow-hidden",
        className
      )}
    >
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-24 animate-pulse rounded-full bg-neutral-200" />
        <div className="flex gap-1">
          <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-100" />
          <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-100" />
        </div>
      </div>

      {/* Body Skeleton */}
      <div className="flex flex-col gap-2.5 mt-1">
        <div className="h-6 w-3/4 animate-pulse rounded-md bg-neutral-100" />
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-full animate-pulse rounded-md bg-neutral-50" />
          <div className="h-4 w-5/6 animate-pulse rounded-md bg-neutral-50" />
        </div>
      </div>

      {/* Progress Skeleton (optional, but looks good) */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="h-3 w-32 animate-pulse rounded-full bg-neutral-100" />
          <div className="h-3 w-8 animate-pulse rounded-full bg-neutral-100" />
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-50">
          <div className="h-full w-1/2 animate-pulse bg-neutral-200" />
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 animate-pulse rounded-lg bg-neutral-100 shrink-0" />
          <div className="flex flex-col gap-1.5 w-full">
            <div className="h-2.5 w-16 animate-pulse rounded-full bg-neutral-100" />
            <div className="h-3 w-20 animate-pulse rounded-full bg-neutral-200" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 animate-pulse rounded-lg bg-neutral-100 shrink-0" />
          <div className="flex flex-col gap-1.5 w-full">
            <div className="h-2.5 w-16 animate-pulse rounded-full bg-neutral-100" />
            <div className="h-3 w-20 animate-pulse rounded-full bg-neutral-200" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-neutral-50 mt-1" />

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 animate-pulse rounded-full bg-neutral-200 shrink-0" />
          <div className="h-3 w-24 animate-pulse rounded-full bg-neutral-100" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-14 animate-pulse rounded-md bg-neutral-100" />
          <div className="h-8 w-24 animate-pulse rounded-md bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
