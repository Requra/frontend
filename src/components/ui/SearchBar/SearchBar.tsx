import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  className?: string
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
}

export function SearchBar({ 
  placeholder = "Search...", 
  className, 
  value, 
  onChange, 
  onClear 
}: SearchBarProps) {
  const handleClear = () => {
    onClear?.()
    onChange?.("")
  }

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-12 pl-5 pr-12 rounded-full shadow-sm focus:outline-none focus:ring-2 text-sm bg-white border border-neutral-200 focus:ring-primary-500/30 text-neutral-800 placeholder:text-neutral-400 transition-all font-medium"
      />
      
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-12 top-1/2 -translate-y-1/2 p-1 rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-all"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}

      <Search
        className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400"
        size={20}
      />
    </div>
  )
}
