import { Card } from "@/components/ui/Card/Card";
import { Badge } from "@/components/ui/Badge/Badge";
import {
  CheckCircle2,
  CircleCheckBig,
  MessageSquare,
  AlertCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserStory, StoryStatus } from "./types";
import { Button } from "@/components/ui/Button/Button";

/** Map story status to Badge variant */
const STATUS_VARIANT: Record<
  StoryStatus,
  "extracted" | "verified" | "flagged"
> = {
  Extracted: "extracted",
  Verified: "verified",
  Flagged: "flagged",
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
          status === "Extracted" && "bg-linear-to-r from-cyan-400 to-cyan-500",
          status === "Verified" &&
            "bg-linear-to-r from-indigo-400 to-indigo-500",
          status === "Flagged" &&
            "bg-linear-to-r from-orange-400 to-orange-500"
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

const NarrativeLine = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <p>
    <span className="font-bold text-neutral-900">{label}</span> {value}
  </p>
);

const FeedbackBlock = ({
  type,
  message,
  count,
}: {
  type: "stakeholder" | "insight";
  message?: string;
  count?: number;
}) => {
  const isStakeholder = type === "stakeholder";

  return (
    <div
      className={cn(
        "rounded-xl p-4 transition-colors",
        isStakeholder
          ? "bg-neutral-50 hover:bg-neutral-100/60"
          : "bg-red-50/60 border border-red-100 hover:bg-red-50/80"
      )}
    >
      {/* Feedback label */}
      <div className="flex items-center justify-between mb-2">
        <div
          className={cn(
            "flex items-center gap-2 text-xs font-semibold",
            isStakeholder ? "text-neutral-500" : "text-red-600"
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
          isStakeholder ? "text-neutral-600" : "text-red-700 font-medium"
        )}
      >
        {message}
      </p>

      {/* Show all link */}
      {isStakeholder && count !== undefined && count > 0 && (
        <button className="text-primary-600 text-xs font-semibold mt-2 hover:underline hover:text-primary-700 transition-colors">
          Show all Comments →
        </button>
      )}
    </div>
  );
};

const QualityScore = ({ score }: { score: number }) => {
  const getScoreColor = () => {
    if (score >= 90) return "border-indigo-400 text-indigo-600 bg-indigo-50/50";
    if (score >= 70)
      return "border-primary-400 text-primary-600 bg-primary-50/50";
    return "border-orange-400 text-orange-500 bg-orange-50/50";
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 duration-300",
          getScoreColor()
        )}
      >
        {score}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
        Quality Score
      </span>
    </div>
  );
};

const CardActions = ({ isVerified }: { isVerified: boolean }) => (
  <div className="flex items-center gap-1">
    {/* Verify / Verified button */}
    <Button
      aria-label={isVerified ? "Verified" : "Verify"}
      className={cn(
        "p-2 rounded-lg transition-all duration-200",
        isVerified
          ? "text-indigo-600 bg-indigo-50"
          : "text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50"
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
      aria-label="Edit"
      className="p-2 rounded-lg text-neutral-400 transition-all duration-200 hover:text-neutral-700 hover:bg-neutral-100"
    >
      <Pencil className="w-4 h-4" />
    </Button>

    {/* Delete */}
    <Button
      aria-label="Delete"
      className="p-2 rounded-lg text-neutral-400 transition-all duration-200 hover:text-red-500 hover:bg-red-50"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
);
