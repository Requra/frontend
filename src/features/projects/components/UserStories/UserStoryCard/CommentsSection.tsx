import { MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Comment } from "../types";
import { CommentStatus } from "../types";

interface CommentsSectionProps {
  comments: Comment[];
  totalComments: number;
}

const MAX_VISIBLE = 3;

const STATUS_DOT: Record<CommentStatus, string> = {
  [CommentStatus.Open]:       "bg-blue-500",
  [CommentStatus.InProgress]: "bg-amber-500",
  [CommentStatus.Resolved]:   "bg-success-500",
  [CommentStatus.Rejected]:   "bg-red-500",
};

const STATUS_LABEL: Record<CommentStatus, string> = {
  [CommentStatus.Open]:       "Open",
  [CommentStatus.InProgress]: "In Progress",
  [CommentStatus.Resolved]:   "Resolved",
  [CommentStatus.Rejected]:   "Rejected",
};

/** Deterministic pastel color from an ID string — used for commenter avatars */
const AVATAR_COLORS = [
  "bg-primary-100 text-primary-600",
  "bg-blue-100 text-blue-600",
  "bg-indigo-100 text-indigo-600",
  "bg-cyan-100 text-cyan-600",
  "bg-amber-100 text-amber-600",
  "bg-green-100 text-green-600",
];

function getAvatarColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/** Generates a readable label from an authorId, e.g., "Commenter A" */
function getAuthorLabel(index: number): string {
  const letter = String.fromCharCode(65 + (index % 26)); // A–Z
  return `Commenter ${letter}`;
}

/** Format large numbers: 1234 → "1.2K", 1234567 → "1.2M" */
function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export const CommentsSection = ({ comments, totalComments }: CommentsSectionProps) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="flex items-center gap-2 py-1">
        <MessageSquare className="w-3.5 h-3.5 text-neutral-300" />
        <span className="text-[11px] text-neutral-400 font-medium">No comments yet</span>
      </div>
    );
  }

  const visibleComments = comments.slice(0, MAX_VISIBLE);
  const remaining = totalComments - visibleComments.length;

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Comments
        </span>
        <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 rounded-full px-1.5 py-0.5 leading-none">
          {formatCount(totalComments)}
        </span>
      </div>

      {/* Comment list — compact rows */}
      <div className="flex flex-col gap-1.5 max-h-[240px] overflow-y-auto">
        {visibleComments.map((comment, index) => {
          const dotColor = STATUS_DOT[comment.status] || STATUS_DOT[CommentStatus.Open];
          const statusLabel = STATUS_LABEL[comment.status] || "Open";
          const authorLabel = getAuthorLabel(index);
          const avatarColor = getAvatarColor(comment.authorId);

          return (
            <div
              key={comment.id}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-neutral-100 hover:border-neutral-200 transition-colors"
            >
              {/* Avatar with deterministic color */}
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full shrink-0 mt-0.5 text-[9px] font-bold",
                  avatarColor,
                )}
              >
                {authorLabel.charAt(authorLabel.length - 1)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <span className="text-[10px] font-semibold text-neutral-600">
                    {authorLabel}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-neutral-400">
                    <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColor)} />
                    {statusLabel}
                  </span>
                  <span className="text-[10px] text-neutral-300 flex items-center gap-0.5 ml-auto">
                    <Clock className="w-2.5 h-2.5" />
                    {formatTimeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed line-clamp-2">
                  {comment.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View all */}
      {remaining > 0 && (
        <button className="text-[11px] font-semibold text-primary-600 hover:text-primary-700 transition-colors text-left w-fit hover:underline">
          View all {formatCount(totalComments)} comments →
        </button>
      )}
    </div>
  );
};
