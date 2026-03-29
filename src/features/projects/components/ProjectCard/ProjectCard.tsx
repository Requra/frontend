import { cn } from "@/lib/utils"
import type { ProjectCardProps } from "./types"
import { ProjectCardHeader } from "./ProjectCardHeader"
import { ProjectCardBody } from "./ProjectCardBody"
import { ProjectCardProgress } from "./ProjectCardProgress"
import { ProjectCardStats } from "./ProjectCardStats"
import { ProjectCardFooter } from "./ProjectCardFooter"

export function ProjectCard({
  status,
  title,
  description,
  progress,
  featuresCount,
  unsolvedComments,
  userName,
  userAvatar,
  className,
  searchQuery,
}: ProjectCardProps) {
  return (
    <div className={cn(
      "group relative flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10 hover:border-primary-200",
      className
    )}>
      <ProjectCardHeader status={status} />
      <ProjectCardBody title={title} description={description} searchQuery={searchQuery} />
      <ProjectCardProgress status={status} progress={progress} />
      <ProjectCardStats status={status} featuresCount={featuresCount} unsolvedComments={unsolvedComments} />
      <div className="h-px w-full bg-neutral-50 mt-1" />
      <ProjectCardFooter userName={userName} userAvatar={userAvatar} />
    </div>
  )
}
