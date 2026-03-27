import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";

export const GeneratedVsApproved = () => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-neutral-800">Generated vs Approved Requirements</h3>
        <Button variant="ghost-neutral" size="sm" className="text-sm font-medium text-neutral-500 hover:text-neutral-700 flex items-center gap-1 mt-1 font-sans h-auto p-0">
          Last 7 days <ChevronDown size={14} />
        </Button>
      </div>

      <div className="flex-1 w-full border border-dashed border-neutral-200 rounded-xl flex items-center justify-center text-neutral-400 bg-neutral-50/50 min-h-[200px]">
        {/* Placeholder for the Chart component */}
        Chart Placeholder
      </div>
    </div>
  );
};
