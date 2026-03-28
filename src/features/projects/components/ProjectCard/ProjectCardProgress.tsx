import type { ProjectStatus } from "./types"

interface ProjectCardProgressProps {
  status: ProjectStatus
  progress?: number
}

export function ProjectCardProgress({ status, progress }: ProjectCardProgressProps) {
  if (status !== "IN PROGRESS" || progress === undefined) return null

  return (
    <div className="flex flex-col gap-2 mt-1">
      <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500">
        <span>Requirements Generation</span>
        <span className="text-primary-600">{progress}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full bg-primary-500 shadow-[0_0_8px_rgba(127,86,217,0.4)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
