import { User } from "lucide-react"
import { Button } from "@/components/ui/Button/Button"

interface ProjectCardFooterProps {
  userName: string
  userAvatar?: string
}

export function ProjectCardFooter({ userName, userAvatar }: ProjectCardFooterProps) {
  return (
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
  )
}
