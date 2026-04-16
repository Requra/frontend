/**
 * Requra.Domain.Enums - Global & Shared Enums
 * Using 'as const' objects to comply with 'erasableSyntaxOnly' constraint.
 */

export const Language = {
  En: 0,
  Ar: 1,
} as const;
export type Language = (typeof Language)[keyof typeof Language];

export const ApprovalDecision = {
  Pending: 0,
  Approved: 1,
  Rejected: 2,
} as const;
export type ApprovalDecision = (typeof ApprovalDecision)[keyof typeof ApprovalDecision];

export const CommentStatus = {
  Read: 0,
  Ignored: 1,
  Pending: 2,
  Resolved: 3,
} as const;
export type CommentStatus = (typeof CommentStatus)[keyof typeof CommentStatus];

export const AIModelStatus = {
  Queued: 0,
  Processing: 1,
  Completed: 2,
  Failed: 3,
} as const;
export type AIModelStatus = (typeof AIModelStatus)[keyof typeof AIModelStatus];

export const JobType = {
  Extraction: 1,
  Summarization: 2,
  Classification: 4,
  Full: 8,
} as const;
export type JobType = (typeof JobType)[keyof typeof JobType];

export const SummaryStatus = {
  Draft: 0,
  Processing: 1,
  Completed: 2,
  Failed: 3,
} as const;
export type SummaryStatus = (typeof SummaryStatus)[keyof typeof SummaryStatus];

export const MeetingRole = {
  Host: 0,
  Participant: 1,
} as const;
export type MeetingRole = (typeof MeetingRole)[keyof typeof MeetingRole];

export const MeetingStatus = {
  Scheduled: 0,
  Live: 1,
  Ended: 2,
  Cancelld: 3,
} as const;
export type MeetingStatus = (typeof MeetingStatus)[keyof typeof MeetingStatus];
