export type StoryStatus = "Extracted" | "Verified" | "Flagged";
export type FeedbackType = "stakeholder" | "insight";

export interface UserStory {
  id: string;
  status: StoryStatus;
  role: string;
  action: string;
  benefit: string;
  feedbackType?: FeedbackType;
  feedbackMessage?: string;
  feedbackCount?: number;
  qualityScore: number;
}



export const MOCK_STORIES: UserStory[] = [
  {
    id: "US-01",
    status: "Extracted",
    role: "Content Curator",
    action: "automatically tag requirements with metadata",
    benefit: "I can filter the backlog by technical complexity",
    feedbackType: "stakeholder",
    feedbackMessage:
      '"Consider adding a \'priority\' tag alongside complexity." — Shawky.',
    feedbackCount: 2,
    qualityScore: 85,
  },
  {
    id: "US-02",
    status: "Verified",
    role: "Content Curator",
    action: "automatically tag requirements with metadata",
    benefit: "I can filter the backlog by technical complexity",
    feedbackType: "stakeholder",
    feedbackMessage: "No critical comments. Ready for export.",
    qualityScore: 90,
  },
  {
    id: "US-03",
    status: "Flagged",
    role: "Content Curator",
    action: "automatically tag requirements with metadata",
    benefit: "I can filter the backlog by technical complexity",
    feedbackType: "insight",
    feedbackMessage:
      "Potentially hazardous requirement. Deleting all users requires multi-step verification.",
    qualityScore: 40,
  },
];
