import React from "react";
import type { TranscriptionEntry as TranscriptionEntryType } from "../types";
import { TranscriptionEntry } from "./TranscriptionEntry";
import { Button } from "@/components/ui/Button/Button";
import { ChevronDown, Download, Highlighter, Search, PhoneOff } from "lucide-react";

interface TranscriptionPanelProps {
  entries: TranscriptionEntryType[];
}

export const TranscriptionPanel: React.FC<TranscriptionPanelProps> = ({
  entries,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white shadow-inner relative overflow-hidden h-full">
      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md group">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search in transcript..." 
              className="w-full bg-neutral-100/50 border-none rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary-200 transition-all placeholder:text-neutral-400"
            />
          </div>
          <Button variant="ghost" size="sm" className="hidden lg:flex items-center gap-2 text-neutral-500 font-bold hover:bg-neutral-100 px-4 rounded-xl">
            <Highlighter size={16} className="text-primary-500" />
            Highlight
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-neutral-500 hover:text-neutral-900 bg-neutral-50 rounded-xl hover:bg-neutral-100">
            <Download size={20} />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-6 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent"
      >
        {entries.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-neutral-400 gap-4 opacity-50 bg-neutral-50/30 rounded-3xl border-2 border-dashed border-neutral-100 m-4">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-neutral-100">
               <PhoneOff size={32} className="text-neutral-300" />
            </div>
            <p className="font-bold text-sm tracking-tight">Transcription is active. Waiting for speech...</p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            {entries.map((entry) => (
              <TranscriptionEntry key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>

      {/* Auto-scroll anchor */}
      <button className="absolute bottom-10 right-10 bg-primary-600 text-white p-3 rounded-full shadow-2xl hover:bg-primary-700 transition-all hover:scale-110 active:scale-95 z-30 flex items-center gap-2 px-6 group border-2 border-white">
        <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -left-12 bg-neutral-900 text-white px-3 py-1 rounded-md pointer-events-none">Jump to LIVE</span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>
    </div>
  );
};
