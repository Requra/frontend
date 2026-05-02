import { Card } from "@/components/ui/Card/Card";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
    >
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="w-full">
      {/* Header skeleton */}
      <div className="space-y-2 mb-8">
        <Shimmer className="h-10 w-48 bg-white/20" />
        <Shimmer className="h-5 w-72 bg-white/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Skeleton */}
        <Card className="lg:col-span-5 rounded-[32px] p-8 space-y-8 bg-white border border-neutral-100">
          <div className="flex items-center gap-6">
            <Shimmer className="w-24 h-24 bg-neutral-200/60 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <Shimmer className="h-6 w-32 bg-neutral-200/60" />
              <Shimmer className="h-4 w-48 bg-neutral-200/40" />
            </div>
          </div>
          <div className="space-y-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <Shimmer className="h-4 w-20 bg-neutral-100/80" />
                <Shimmer className="h-4 w-32 bg-neutral-100/80" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <Shimmer key={i} className="h-20 bg-neutral-100/60 rounded-2xl" />
            ))}
          </div>
          <Shimmer className="h-12 bg-neutral-100/60 rounded-2xl" />
        </Card>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <Shimmer className="h-6 w-36 bg-neutral-200/40" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Shimmer key={i} className="h-[68px] bg-white/40 rounded-2xl" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Shimmer className="h-6 w-28 bg-neutral-200/40" />
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <Shimmer key={i} className="h-[68px] bg-white/40 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
