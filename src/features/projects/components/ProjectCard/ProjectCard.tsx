import { cn } from "@/lib/utils"
import type { ProjectCardProps } from "./types"
import { ProjectCardHeader } from "./ProjectCardHeader"
import { ProjectCardBody } from "./ProjectCardBody"
import { ProjectCardProgress } from "./ProjectCardProgress"
import { ProjectCardStats } from "./ProjectCardStats"
import { useNavigate } from "react-router-dom"
import { paths } from "@/routes/paths"
import { ProjectCardFooter } from "./ProjectCardFooter"

export function ProjectCard({
  id,
  status,
  name,
  description,
  progress,
  featuresCount,
  unsolvedComments,
  clientName,
  userAvatar,
  className,
  searchQuery,
}: ProjectCardProps) {
  const navigate = useNavigate()

  return (
    <div 
      className={cn(
        "group relative flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10 hover:border-primary-200 cursor-pointer",
        className
      )}
      onClick={() => navigate(paths.app.projects.details(id))}
    >
      <ProjectCardHeader status={status} />
      <ProjectCardBody name={name} description={description} searchQuery={searchQuery} />
      <ProjectCardProgress status={status} progress={progress} />
      <ProjectCardStats status={status} featuresCount={featuresCount} unsolvedComments={unsolvedComments} />
      <div className="h-px w-full bg-neutral-50 mt-1" />
      <ProjectCardFooter clientName={clientName} userAvatar={userAvatar} id={id} />
    </div>
  )
}
