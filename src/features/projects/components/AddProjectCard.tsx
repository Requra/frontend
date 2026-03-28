import { Plus, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddProjectCardProps {
  className?: string
  onClick?: () => void
}

export function AddProjectCard({ className, onClick }: AddProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-6 transition-all hover:border-primary-300 hover:bg-neutral-50 cursor-pointer overflow-hidden",
        className
      )}
    >
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
        <Plus className="text-neutral-400 transition-colors group-hover:text-primary-500" size={24} />
        <Sparkles 
          className="absolute -top-1 -right-1 text-primary-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" 
          size={16} 
        />
      </div>
      <p className="max-w-[140px] text-center text-sm font-medium text-neutral-400 transition-colors group-hover:text-neutral-600">
        Add new project to start processing
      </p>
    </button>
  )
}
