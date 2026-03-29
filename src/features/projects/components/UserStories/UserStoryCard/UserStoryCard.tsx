import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import { CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserStory, StoryStatus } from "../types";
import { NarrativeLine } from "./NarrativeLine";
import { FeedbackBlock } from "./FeedbackBlock";
import { QualityScore } from "./QualityScore";
import { CardActions } from "./CardActions";

/** Map story status → Badge variant */
const STATUS_VARIANT: Record<StoryStatus, "extracted" | "verified" | "flagged"> =
  {
    Extracted: "extracted",
    Verified: "verified",
    Flagged: "flagged",
  };

/** Gradient accent per status */
const ACCENT_GRADIENT: Record<StoryStatus, string> = {
  Extracted: "bg-linear-to-r from-cyan-400 to-cyan-500",
  Verified: "bg-linear-to-r from-indigo-400 to-indigo-500",
  Flagged: "bg-linear-to-r from-orange-400 to-orange-500",
};

export const UserStoryCard = ({
  id,
  status,
  role,
  action,
  benefit,
  feedbackType,
  feedbackMessage,
  feedbackCount,
  qualityScore,
}: UserStory) => {
  const isVerified = status === "Verified";
  const isFlagged = status === "Flagged";

  return (
    <Card
      className={cn(
        "p-6 flex flex-col gap-5 transition-all duration-300 h-full group relative overflow-hidden",
        "hover:shadow-lg hover:-translate-y-0.5",
        isFlagged && "border-orange-200/60"
      )}
    >
      {/* Top accent line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl",
          ACCENT_GRADIENT[status]
        )}
      />

      {/* Header — identifier + status badge */}
      <div className="flex justify-between items-start">
        <div>
          <span className="block text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
            Identifier
          </span>
          <span className="text-lg font-bold text-neutral-800">{id}</span>
        </div>
        <Badge variant={STATUS_VARIANT[status]} size="lg">
          {isVerified && <CircleCheckBig className="w-3 h-3 mr-1" />}
          {status}
        </Badge>
      </div>

      {/* Narrative */}
      <div className="text-sm text-neutral-600 leading-relaxed space-y-2.5">
        <NarrativeLine label="As a" value={role} />
        <NarrativeLine label="I want to" value={action} />
        <NarrativeLine label="So that" value={benefit} />
      </div>

      {/* Dynamic feedback block (pushes to bottom) */}
      <div className="mt-auto">
        {feedbackType && (
          <FeedbackBlock
            type={feedbackType}
            message={feedbackMessage}
            count={feedbackCount}
          />
        )}
      </div>

      {/* Footer — quality score + actions */}
      <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
        <QualityScore score={qualityScore} />
        <CardActions isVerified={isVerified} />
      </div>
    </Card>
  );
};
