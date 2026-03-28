import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export function SearchBar({ placeholder = "Search...", className }: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-12 pl-5 pr-12 rounded-full shadow-sm focus:outline-none focus:ring-2 text-sm bg-white border border-neutral-200 focus:ring-primary-500/30 text-neutral-800 placeholder:text-neutral-400 transition-all font-medium"
      />
      <Search
        className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400"
        size={20}
      />
    </div>
  )
}
