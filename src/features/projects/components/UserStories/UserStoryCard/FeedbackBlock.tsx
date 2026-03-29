import { Badge } from "@/components/ui/Badge/Badge";
import { MessageSquare, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button/Button";

interface FeedbackBlockProps {
  type: "stakeholder" | "insight";
  message?: string;
  count?: number;
}

export const FeedbackBlock = ({ type, message, count }: FeedbackBlockProps) => {
  const isStakeholder = type === "stakeholder";

  return (
    <div
      className={cn(
        "rounded-xl p-4 transition-colors",
        isStakeholder
          ? "bg-neutral-50 hover:bg-neutral-100/60"
          : "bg-red-50/60 border border-red-100 hover:bg-red-50/80",
      )}
    >
      {/* Feedback label */}
      <div className="flex items-center justify-between mb-2">
        <div
          className={cn(
            "flex items-center gap-2 text-xs font-semibold",
            isStakeholder ? "text-neutral-500" : "text-red-600",
          )}
        >
          {isStakeholder ? (
            <MessageSquare className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {isStakeholder ? "Stakeholder Feedback" : "AI Insight"}
        </div>
        {isStakeholder && count !== undefined && count > 0 && (
          <Badge
            variant="default"
            size="sm"
            className="rounded-full min-w-5 h-5 justify-center"
          >
            {count}
          </Badge>
        )}
      </div>

      {/* Message */}
      <p
        className={cn(
          "text-xs leading-relaxed",
          isStakeholder ? "text-neutral-600" : "text-red-700 font-medium",
        )}
      >
        {message}
      </p>

      {/* Show all link */}
      {isStakeholder && count !== undefined && count > 0 && (
        <Button
          variant="link"
          className="text-primary-600 text-xs font-semibold mt-2 hover:underline hover:text-primary-700 transition-colors duration-200"
        >
          Show all Comments →
        </Button>
      )}
    </div>
  );
};
