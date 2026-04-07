import { ListChecks, MessageSquare, CheckCircle2 } from "lucide-react"
import { ProjectStatus } from "./types"

interface ProjectCardStatsProps {
  status: ProjectStatus
  featuresCount: number
  unsolvedComments: number
}

export function ProjectCardStats({ status, featuresCount, unsolvedComments }: ProjectCardStatsProps) {
  const isFinished = status === ProjectStatus.Completed

  return (
    <div className="grid grid-cols-2 gap-4 mt-1">
      <StatItem
        icon={<ListChecks size={16} />}
        label="Generated"
        value={`${featuresCount} features`}
      />
      <StatItem
        icon={isFinished && unsolvedComments === 0 ? <CheckCircle2 size={16} className="text-success-500" /> : <MessageSquare size={16} />}
        label={isFinished ? "Feedback" : "Client comments"}
        value={isFinished && unsolvedComments === 0 ? "All resolved ✓" : `${unsolvedComments} unsolved`}
      />
    </div>
  )
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-50 text-neutral-400">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-neutral-400 font-medium">{label}</span>
        <span className="text-xs font-bold text-neutral-900">{value}</span>
      </div>
    </div>
  )
}
