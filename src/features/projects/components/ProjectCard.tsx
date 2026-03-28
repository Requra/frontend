import { MoreVertical, Share2, ListChecks, MessageSquare, User, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button/Button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/DropdownMenu"

export type ProjectStatus = "IN PROGRESS" | "FINISHED" | "DRAFT"

export interface ProjectCardProps {
  status: ProjectStatus
  title: string
  description: string
  progress?: number
  featuresCount: number
  unsolvedComments: number
  userName: string
  userAvatar?: string
  className?: string
}

const statusStyles = {
  "IN PROGRESS": "bg-primary-50 text-primary-600 border-primary-200",
  "FINISHED": "bg-success-50 text-success-600 border-success-200",
  "DRAFT": "bg-neutral-50 text-neutral-600 border-neutral-200",
}

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={cn(
          "rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase",
          statusStyles[status]
        )}>
          {status}
        </span>
        <div className="flex items-center gap-1 opacity-40 transition-opacity group-hover:opacity-100">
          <Button variant="ghost-neutral" size="icon-xs" className="text-neutral-500">
            <Share2 size={14} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost-neutral" size="icon-xs" className="text-neutral-500 focus-visible:ring-0">
                <MoreVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem className="text-neutral-600">
                <Share2 size={14} className="mr-1" />
                Share link
              </DropdownMenuItem>
              <DropdownMenuItem className="text-danger-600 focus:bg-danger-50 focus:text-danger-700">
                <Trash2 size={14} className="mr-1" />
                Delete project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Title & Description */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-heading-md font-bold text-neutral-900 line-clamp-1">{title}</h3>
        <p className="text-body-md text-neutral-500 line-clamp-2">{description}</p>
      </div>

      {/* Progress Bar (Conditional) */}
      {status === "IN PROGRESS" && progress !== undefined && (
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
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-50 text-neutral-400">
            <ListChecks size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-400 font-medium">Generated</span>
            <span className="text-xs font-bold text-neutral-900">{featuresCount} features</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-50 text-neutral-400">
            <MessageSquare size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-400 font-medium">Client comments</span>
            <span className="text-xs font-bold text-neutral-900">{unsolvedComments} unsolved</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-neutral-50 mt-1" />

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-600 overflow-hidden">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="h-full w-full object-cover" />
            ) : (
              <User size={14} />
            )}
          </div>
          <span className="text-xs font-medium text-neutral-500 truncate max-w-[100px]">{userName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="h-8 px-3 text-xs bg-primary-50">
            Edit
          </Button>
          <Button variant="default" size="sm" className="h-8 px-3 text-xs shadow-sm shadow-primary-500/20">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}
