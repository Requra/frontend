export type ProjectStatus = "IN PROGRESS" | "FINISHED" | "DRAFT"

export interface ProjectCardProps {
  id: string
  status: ProjectStatus
  title: string
  description: string
  progress?: number
  featuresCount: number
  unsolvedComments: number
  userName: string
  userAvatar?: string
  className?: string
  searchQuery?: string
}

export const STATUS_STYLES: Record<ProjectStatus, string> = {
  "IN PROGRESS": "bg-primary-50 text-primary-600 border-primary-200",
  "FINISHED": "bg-success-50 text-success-600 border-success-200",
  "DRAFT": "bg-neutral-50 text-neutral-600 border-neutral-200",
}
