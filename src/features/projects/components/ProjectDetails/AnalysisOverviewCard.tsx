import { Card } from "@/components/ui/Card/Card";

export const AnalysisOverviewCard = () => {
  return (
    <Card className="p-8 pb-10">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-xl font-bold text-neutral-900">
          Analysis Overview
        </h3>
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Final Metrics
        </span>
      </div>

      <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-neutral-100 mt-2">
        {/* Total Progress */}
        <div className="flex flex-col flex-1 py-6 lg:py-0 lg:pr-8">
          <span className="text-neutral-500 text-sm font-medium mb-1">
            Total Progress
          </span>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-bold text-green-500 tracking-tight leading-none">
              100%
            </span>
            <span className="text-green-600 font-semibold text-sm">
              Complete
            </span>
          </div>
          <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>

        {/* Total Requirements */}
        <div className="flex flex-col flex-1 py-6 lg:py-0 lg:px-4">
          <span className="text-neutral-500 text-sm font-medium mb-1">
            Total Requirements
          </span>
          <span className="text-4xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
            45
          </span>
          <p className="text-xs text-neutral-400 font-medium leading-relaxed">
            Verified and Unverified
            <br className="hidden xl:block" /> Requirements
          </p>
        </div>

        {/* Approved Requirements */}
        <div className="flex flex-col flex-1 py-6 lg:py-0 lg:px-4">
          <span className="text-neutral-500 text-sm font-medium mb-1">
            Approved Requirements
          </span>
          <span className="text-4xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
            40
          </span>
          <p className="text-xs text-neutral-400 font-medium leading-relaxed">
            Human Verified
            <br className="hidden xl:block" /> Requirements
          </p>
        </div>

        {/* Accuracy */}
        <div className="flex flex-col flex-1 py-6 lg:py-0 lg:pl-4">
          <span className="text-neutral-500 text-sm font-medium mb-1">
            Accuracy
          </span>
          <span className="text-4xl font-bold text-neutral-900 tracking-tight leading-none mb-2">
            98%
          </span>
          <p className="text-xs text-neutral-400 font-medium leading-relaxed">
            Requirements Accuracy
          </p>
        </div>
      </div>
    </Card>
  );
};
