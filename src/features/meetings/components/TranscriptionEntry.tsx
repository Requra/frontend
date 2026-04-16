import React from "react";
import type { TranscriptionEntry as TranscriptionEntryType } from "../types";
import { cn } from "@/lib/utils";

interface TranscriptionEntryProps {
  entry: TranscriptionEntryType;
  isCurrentUser?: boolean;
}

export const TranscriptionEntry: React.FC<TranscriptionEntryProps> = ({
  entry,
  isCurrentUser = false,
}) => {
  return (
    <div className={cn(
      "group w-full max-w-4xl p-5 rounded-2xl transition-all duration-300",
      "hover:bg-neutral-50 border border-transparent hover:border-neutral-100",
      isCurrentUser && "bg-primary-50/10 border-primary-100/30"
    )}>
      <div className="flex items-start gap-4 h-full relative">
        {/* Avatars omitted here in Figma for entries but added for context/best practices */}
        <div className="flex-1 flex flex-col gap-2 relative">
          <div className="flex items-center justify-between h-5">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                {entry.participantName}
              </span>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-tight bg-neutral-100 px-2.5 py-0.5 rounded-md group-hover:bg-primary-50 transition-all">
                {entry.participantRole}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-neutral-400 font-mono">
                {entry.timestamp}
              </span>
            </div>
          </div>
          
          <p className="text-sm leading-relaxed text-neutral-600 font-medium group-hover:text-neutral-800 transition-colors pl-4.5 border-l-2 border-neutral-100 group-hover:border-primary-200 ml-0.5 mt-1.5">
            {entry.text}
          </p>
        </div>
      </div>
    </div>
  );
};
