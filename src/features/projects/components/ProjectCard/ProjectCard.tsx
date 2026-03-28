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
}: ProjectCardProps) {
  return (
    <div className={cn(
      "group relative flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:shadow-md",
      className
    )}>
      <ProjectCardHeader status={status} />
      <ProjectCardBody title={title} description={description} />
      <ProjectCardProgress status={status} progress={progress} />
      <ProjectCardStats featuresCount={featuresCount} unsolvedComments={unsolvedComments} />
      <div className="h-px w-full bg-neutral-50 mt-1" />
      <ProjectCardFooter userName={userName} userAvatar={userAvatar} />
    </div>
  )
}
