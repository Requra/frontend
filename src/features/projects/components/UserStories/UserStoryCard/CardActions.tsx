import { Button } from "@/components/ui/Button/Button";
import { CheckCircle2, CircleCheckBig, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const CardActions = ({ isVerified }: { isVerified: boolean }) => (
  <div className="flex items-center gap-1">
    {/* Verify / Verified button */}
    <Button
      variant="ghost"
      aria-label={isVerified ? "Verified" : "Verify"}
      className={cn(
        "p-2 rounded-lg transition-all duration-200",
        isVerified
          ? "text-indigo-600 bg-indigo-50"
          : "text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50",
      )}
    >
      {isVerified ? (
        <CircleCheckBig className="w-4 h-4" />
      ) : (
        <CheckCircle2 className="w-4 h-4" />
      )}
    </Button>

    {/* Edit */}
    <Button
      variant="ghost"
      aria-label="Edit"
      className="p-2 rounded-lg text-neutral-400 transition-all duration-200 hover:text-neutral-700 hover:bg-neutral-100"
    >
      <Pencil className="w-4 h-4" />
    </Button>

    {/* Delete */}
    <Button
      variant="ghost"
      aria-label="Delete"
      className="p-2 rounded-lg text-neutral-400 transition-all duration-200 hover:text-red-500 hover:bg-red-50"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
);
