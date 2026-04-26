import { Card } from "@/components/ui/Card/Card";

export function ProfileSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-10 w-48 bg-white/20 rounded-lg mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Skeleton */}
        <Card className="lg:col-span-5 rounded-[32px] p-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-neutral-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-6 w-32 bg-neutral-200 rounded" />
              <div className="h-4 w-48 bg-neutral-200 rounded" />
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-20 bg-neutral-100 rounded" />
                <div className="h-4 w-32 bg-neutral-100 rounded" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-neutral-100 rounded-2xl" />
            <div className="h-12 bg-neutral-100 rounded-2xl" />
          </div>
        </Card>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-white/60 rounded-2xl" />
            ))}
          </div>
          <div className="h-6 w-32 bg-white/20 rounded mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-white/60 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
