/**
 * Requra.Domain.Enums - Project Related Enums
 * Using 'as const' objects to comply with 'erasableSyntaxOnly' constraint.
 */

export const ProjectStatus = {
  InProgress: 0,
  Drafted: 1,
  Completed: 2,
  Cancelled: 3,
} as const;
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const ProjectRole = {
  Owner: 0,
  Contributor: 1,
  Viewer: 2,
} as const;
export type ProjectRole = (typeof ProjectRole)[keyof typeof ProjectRole];

export const DocumentStatus = {
  Pending: 0,
  Processing: 1,
  Ready: 2,
  Failed: 3,
} as const;
export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus];

export const DocumentType = {
  pdf: 0,
  docx: 1,
  audio: 2,
  live_session: 3,
} as const;
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];

export const UserStoryPriority = {
  low: 0,
  medium: 1,
  high: 2,
  critical: 3,
} as const;
export type UserStoryPriority = (typeof UserStoryPriority)[keyof typeof UserStoryPriority];

export const UserStoryStatus = {
  Draft: 0,
  Approved: 1,
  InProgress: 2,
  Rejected: 3,
} as const;
export type UserStoryStatus = (typeof UserStoryStatus)[keyof typeof UserStoryStatus];

export const RequirementStatus = {
  Drafted: 0,
  Approved: 1,
  Rejected: 2,
} as const;
export type RequirementStatus = (typeof RequirementStatus)[keyof typeof RequirementStatus];

export const RequirementType = {
  Functional: 0,
  Non_Functional: 1,
  Business_Rule: 2,
} as const;
export type RequirementType = (typeof RequirementType)[keyof typeof RequirementType];

export const ProjectType = {
  None: 0,
  Financial: 1,
  Medical: 2,
  Educational: 4,
} as const;
export type ProjectType = (typeof ProjectType)[keyof typeof ProjectType];
