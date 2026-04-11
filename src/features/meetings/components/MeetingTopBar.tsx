import { Users, Layout, ScrollText, Settings, ShieldCheck, Timer } from "lucide-react";
import { useMeetingStore } from "../stores/useMeetingStore";
import { cn } from "@/lib/utils";

interface MeetingTopBarProps {
  title: string;
}

export const MeetingTopBar = ({ title }: MeetingTopBarProps) => {
  const { 
    viewMode, 
    duration, 
    participants, 
    setViewMode,
    toggleSidebar,
    activeSidePanel
  } = useMeetingStore();

  const isDark = viewMode === "grid";

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn(
      "h-20 flex items-center justify-between px-8 transition-all duration-500 z-50",
      isDark 
        ? "bg-neutral-950/40 backdrop-blur-2xl border-b border-white/5" 
        : "bg-white/90 backdrop-blur-2xl border-b border-neutral-200"
    )}>
      {/* Left: Meeting Info */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <h1 className={cn(
            "text-lg font-black tracking-tight flex items-center gap-3",
            isDark ? "text-white" : "text-neutral-900"
          )}>
            {title}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase font-black tracking-widest text-green-500">Live</span>
            </div>
          </h1>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-neutral-500">
               <ShieldCheck size={12} className="text-primary-500" />
               End-to-End Encrypted
            </div>
          </div>
        </div>
      </div>

      {/* Center: Live Timer */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 bg-primary-500/10 px-4 py-2 rounded-2xl border border-primary-500/20">
        <Timer size={14} className="text-primary-500" />
        <span className={cn(
          "text-sm font-mono font-bold tracking-tighter",
          isDark ? "text-primary-400" : "text-primary-600"
        )}>
          {formatDuration(duration)}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* View Switchers */}
        <div className={cn(
          "flex items-center p-1 rounded-2xl border transition-all",
          isDark ? "bg-white/5 border-white/5" : "bg-neutral-100 border-neutral-200"
        )}>
          <button 
            onClick={() => setViewMode("grid")}
            className={cn(
              "h-10 px-4 rounded-xl flex items-center gap-2 transition-all text-xs font-bold",
              viewMode === "grid" 
                ? (isDark ? "bg-white/10 text-white shadow-xl" : "bg-white text-neutral-900 shadow-sm")
                : "text-neutral-500 hover:text-neutral-300"
            )}
          >
            <Layout size={16} />
            Grid
          </button>
          <button 
            onClick={() => setViewMode("transcript")}
            className={cn(
              "h-10 px-4 rounded-xl flex items-center gap-2 transition-all text-xs font-bold",
              viewMode === "transcript" 
                ? (isDark ? "bg-white/10 text-white shadow-xl" : "bg-white text-neutral-900 shadow-sm")
                : "text-neutral-500 hover:text-neutral-300"
            )}
          >
            <ScrollText size={16} />
            Transcript
          </button>
        </div>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <div className="flex items-center gap-2">
          <button 
            onClick={() => toggleSidebar("participants")}
            className={cn(
               "h-11 w-11 rounded-2xl relative flex items-center justify-center transition-all",
               activeSidePanel === "participants" 
                 ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" 
                 : (isDark ? "text-neutral-400 hover:bg-white/5" : "text-neutral-500 hover:bg-neutral-100")
            )}
          >
            <Users size={20} />
            <span className={cn(
              "absolute -top-1 -right-1 h-5 w-5 text-[10px] font-bold flex items-center justify-center rounded-lg border-2",
              isDark ? "bg-primary-500 text-white border-neutral-950" : "bg-primary-600 text-white border-white"
            )}>
              {participants.length}
            </span>
          </button>
          
          <button className={cn(
            "h-11 w-11 rounded-2xl flex items-center justify-center transition-all",
            isDark ? "text-neutral-400 hover:bg-white/5" : "text-neutral-500 hover:bg-neutral-100"
          )}>
            <Settings size={20} />
          </button>
          
          <div className="h-10 w-10 rounded-full border-2 border-primary-500 p-0.5 ml-2 ring-1 ring-primary-500/20 shadow-xl overflow-hidden cursor-pointer group">
            <div className="h-full w-full rounded-full bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform text-white text-xs font-bold uppercase">
              {participants[0]?.initials || "AJ"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
