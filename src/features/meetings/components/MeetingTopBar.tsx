import { Users, Layout, ScrollText, Settings, ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils";

interface MeetingTopBarProps {
  title: string;
  duration: string;
  participantCount: number;
  viewMode: "grid" | "transcript";
  onViewModeChange: (mode: "grid" | "transcript") => void;
  isRecording?: boolean;
}

export const MeetingTopBar = ({ 
  title, 
  duration, 
  participantCount, 
  viewMode,
  onViewModeChange,
  isRecording = true 
}: MeetingTopBarProps) => {
  const isDark = viewMode === "grid";

  return (
    <div className={cn(
      "h-20 flex items-center justify-between px-8 transition-all duration-500 z-50",
      isDark 
        ? "bg-neutral-950/40 backdrop-blur-2xl border-b border-white/5" 
        : "bg-white/90 backdrop-blur-2xl border-b border-neutral-200"
    )}>
      {/* Left: Meeting Info & Security */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <h1 className={cn(
            "text-lg font-bold tracking-tight",
            isDark ? "text-white" : "text-neutral-900"
          )}>{title}</h1>
          <div className={cn(
            "flex items-center gap-2 p-1.5 px-3 rounded-xl border transition-colors",
            isDark ? "bg-white/5 border-white/5 text-neutral-400 group hover:border-white/10" : "bg-neutral-100 border-neutral-200 text-neutral-500"
          )}>
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">req-4a7x-bkm</span>
            <ChevronDown size={14} className="ml-1 opacity-50" />
          </div>
        </div>
      </div>

      {/* Center: Live Status */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
        {isRecording && (
          <div className="flex items-center gap-3 bg-red-500/10 px-4 py-2 rounded-2xl border border-red-500/20">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Live Record</span>
            <div className="w-px h-3 bg-red-500/20 mx-1" />
            <span className="text-xs font-mono font-bold text-red-500/80">{duration}</span>
          </div>
        )}
      </div>

      {/* Right: View Switching & Global Actions */}
      <div className="flex items-center gap-4">
        {/* View Switchers */}
        <div className={cn(
          "flex items-center p-1 rounded-2xl border transition-all",
          isDark ? "bg-white/5 border-white/5" : "bg-neutral-100 border-neutral-200"
        )}>
          <button 
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "h-10 px-4 rounded-xl flex items-center gap-2 transition-all text-xs font-bold",
              viewMode === "grid" 
                ? (isDark ? "bg-white/10 text-white shadow-xl" : "bg-white text-neutral-900 shadow-sm")
                : (isDark ? "text-neutral-500 hover:text-neutral-300" : "text-neutral-400 hover:text-neutral-600")
            )}
          >
            <Layout size={16} />
            Grid
          </button>
          <button 
            onClick={() => onViewModeChange("transcript")}
            className={cn(
              "h-10 px-4 rounded-xl flex items-center gap-2 transition-all text-xs font-bold",
              viewMode === "transcript" 
                ? (isDark ? "bg-white/10 text-white shadow-xl" : "bg-white text-neutral-900 shadow-sm")
                : (isDark ? "text-neutral-500 hover:text-neutral-300" : "text-neutral-400 hover:text-neutral-600")
            )}
          >
            <ScrollText size={16} />
            Transcript
          </button>
        </div>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
               "h-11 w-11 rounded-2xl relative",
               isDark ? "text-neutral-400 hover:bg-white/5" : "text-neutral-500 hover:bg-neutral-100"
            )}
          >
            <Users size={20} />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center rounded-lg border-2 border-neutral-950">
              {participantCount}
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-11 w-11 rounded-2xl",
              isDark ? "text-neutral-400 hover:bg-white/5" : "text-neutral-500 hover:bg-neutral-100"
            )}
          >
            <Settings size={20} />
          </Button>
          
          <div className="h-10 w-10 rounded-full border-2 border-primary-500 p-0.5 ml-2 ring-1 ring-primary-500/20 shadow-xl overflow-hidden cursor-pointer group">
            <div className="h-full w-full rounded-full bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-xs font-bold text-white">JD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
