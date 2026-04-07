import { UserStoryStatus, UserStoryPriority } from "../../types/enums"

export { UserStoryStatus, UserStoryPriority }
export type FeedbackType = "stakeholder" | "insight";

export interface UserStory {
  id: string;
  status: UserStoryStatus;
  role: string;
  action: string;
  benefit: string;
  priority?: UserStoryPriority;
  feedbackType?: FeedbackType;
  feedbackMessage?: string;
  feedbackCount?: number;
  qualityScore: number;
}

export const MOCK_STORIES: UserStory[] = [
  {
    id: "US-01",
    status: UserStoryStatus.Draft,
    role: "Content Curator",
    action: "automatically tag requirements with metadata",
    benefit: "I can filter the backlog by technical complexity",
    priority: UserStoryPriority.medium,
    feedbackType: "stakeholder",
    feedbackMessage:
      '"Consider adding a \'priority\' tag alongside complexity." — Shawky.',
    feedbackCount: 2,
    qualityScore: 85,
  },
  {
    id: "US-02",
    status: UserStoryStatus.Approved,
    role: "Content Curator",
    action: "automatically tag requirements with metadata",
    benefit: "I can filter the backlog by technical complexity",
    priority: UserStoryPriority.high,
    feedbackType: "stakeholder",
    feedbackMessage: "No critical comments. Ready for export.",
    qualityScore: 90,
  },
  {
    id: "US-03",
    status: UserStoryStatus.Rejected,
    role: "Content Curator",
    action: "automatically tag requirements with metadata",
    benefit: "I can filter the backlog by technical complexity",
    priority: UserStoryPriority.critical,
    feedbackType: "insight",
    feedbackMessage:
      "Potentially hazardous requirement. Deleting all users requires multi-step verification.",
    qualityScore: 40,
  },
];
