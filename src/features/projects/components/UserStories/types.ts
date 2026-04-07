import { UserStoryStatus, UserStoryPriority } from "../../types/enums"

export { UserStoryStatus, UserStoryPriority }

export interface UserStory {
  id: string;
  status: UserStoryStatus;
  title: string;
  description: string | null;
  priority: UserStoryPriority;
  qualityScore: number;
}

export const MOCK_STORIES: UserStory[] = [
  {
    id: "US-01",
    status: UserStoryStatus.Draft,
    title: "As a Content Curator, I want to automatically tag requirements with metadata so that I can filter the backlog by technical complexity",
    description: "Consider adding a 'priority' tag alongside complexity. — Shawky.",
    priority: UserStoryPriority.medium,
    qualityScore: 85,
  },
  {
    id: "US-02",
    status: UserStoryStatus.Approved,
    title: "As a Content Curator, I want to automatically tag requirements with metadata so that I can filter the backlog by technical complexity",
    description: "No critical comments. Ready for export.",
    priority: UserStoryPriority.high,
    qualityScore: 90,
  },
  {
    id: "US-03",
    status: UserStoryStatus.Rejected,
    title: "As a Content Curator, I want to automatically tag requirements with metadata so that I can filter the backlog by technical complexity",
    description: "Potentially hazardous requirement. Deleting all users requires multi-step verification.",
    priority: UserStoryPriority.critical,
    qualityScore: 40,
  },
];
