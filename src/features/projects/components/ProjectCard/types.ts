import { ProjectStatus } from "../../types/enums"

export { ProjectStatus }

export interface ProjectCardProps {
  id: string
  status: ProjectStatus
  name: string
  description: string
  progress?: number
  featuresCount?: number
  unsolvedComments?: number
  clientEmail: string
  userAvatar?: string
  className?: string
  searchQuery?: string
}

export const STATUS_STYLES: Record<ProjectStatus, string> = {
  [ProjectStatus.InProgress]: "bg-primary-50 text-primary-600 border-primary-200",
  [ProjectStatus.Completed]: "bg-success-50 text-success-600 border-success-200",
  [ProjectStatus.Drafted]: "bg-neutral-50 text-neutral-600 border-neutral-200",
  [ProjectStatus.Cancelled]: "bg-error-50 text-error-600 border-error-200",
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  [ProjectStatus.InProgress]: "IN PROGRESS",
  [ProjectStatus.Completed]: "FINISHED",
  [ProjectStatus.Drafted]: "DRAFT",
  [ProjectStatus.Cancelled]: "CANCELLED",
}
