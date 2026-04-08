import { Search, Filter, MoreVertical, Sparkles } from "lucide-react";
import type { TranscriptionEntry } from "../types";
import { cn } from "@/lib/utils";

interface MeetingTranscriptViewProps {
  entries: TranscriptionEntry[];
}

export const MeetingTranscriptView = ({ entries }: MeetingTranscriptViewProps) => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Search and Filters Bar */}
      <div className="h-16 flex items-center justify-between px-8 border-b border-neutral-100 bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-6 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search in transcript or ask AI..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-100/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-neutral-500 hover:text-neutral-900 transition-colors text-xs font-bold uppercase tracking-wider">
              <Filter size={14} />
              Filters
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-primary-600 hover:text-primary-700 transition-colors text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              AI Summary
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-neutral-200" />
            ))}
            <div className="h-8 w-8 rounded-full border-2 border-white bg-primary-500 flex items-center justify-center text-[10px] font-bold text-white">
              +12
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-4xl mx-auto py-12 px-8 space-y-10">
          {entries.map((entry, index) => (
            <div key={entry.id} className="group relative flex gap-8">
              {/* Timeline Indicator */}
              <div className="flex flex-col items-center pt-1.5 shrink-0">
                <div className={cn(
                  "h-2.5 w-2.5 rounded-full ring-4 ring-neutral-50",
                  index === entries.length - 1 ? "bg-primary-500 animate-pulse" : "bg-neutral-300"
                )} />
                {index !== entries.length - 1 && (
                  <div className="w-[2px] flex-1 bg-neutral-100 my-2" />
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-neutral-900">{entry.participantName}</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{entry.timestamp}</span>
                    {index === entries.length - 1 && (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 bg-primary-100 text-primary-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        <span className="w-1 h-1 bg-primary-500 rounded-full animate-pulse" />
                        Speaking now
                      </span>
                    )}
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-neutral-400 hover:text-neutral-900">
                    <MoreVertical size={16} />
                  </button>
                </div>
                
                <div className="relative p-5 rounded-3xl bg-neutral-50/50 group-hover:bg-neutral-50 transition-colors border border-transparent group-hover:border-neutral-100">
                  <p className="text-neutral-700 leading-relaxed font-medium">
                    {entry.text}
                  </p>
                  
                  {/* Speaker Highlight Bar */}
                  {index === entries.length - 1 && (
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-linear-to-r from-primary-500 to-primary-600 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div className="h-20" /> {/* Spacer for floating bar */}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};
