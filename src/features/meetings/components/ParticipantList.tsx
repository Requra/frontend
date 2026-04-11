import React from "react";
import { X, Users, MicOff, MoreVertical, Star } from "lucide-react";
import { useMeetingStore } from "../stores/useMeetingStore";
import { cn } from "@/lib/utils";
import type { Participant } from "../types";

export const ParticipantList: React.FC<{ participants: Participant[] }> = ({ participants }) => {
  const { viewMode, toggleSidebar } = useMeetingStore();
  const isDark = viewMode === "grid";

  return (
    <div className={cn(
      "w-80 h-full flex flex-col border-l transition-all duration-500 premium-blur z-40",
      isDark ? "bg-neutral-900/80 border-white/5" : "bg-white border-neutral-200"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-primary-500" />
          <h2 className={cn(
            "text-sm font-black uppercase tracking-widest",
            isDark ? "text-white" : "text-neutral-900"
          )}>Participants ({participants.length})</h2>
        </div>
        <button 
          onClick={() => toggleSidebar(null)}
          className="p-1.5 rounded-lg hover:bg-white/5 text-neutral-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* List Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {participants.map((participant) => (
          <div 
            key={participant.id} 
            className={cn(
              "flex items-center justify-between p-3 rounded-2xl group transition-all",
              isDark ? "hover:bg-white/5" : "hover:bg-neutral-50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-primary-500/20 overflow-hidden shadow-inner">
                  {participant.avatarUrl ? (
                    <img src={participant.avatarUrl} alt={participant.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-white tracking-widest uppercase">{participant.initials}</span>
                  )}
                </div>
                {participant.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-950" />
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={cn(
                    "text-xs font-bold",
                    isDark ? "text-white" : "text-neutral-900"
                  )}>{participant.name}</span>
                  {participant.role === "Product Manager" && (
                    <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-black leading-none mt-1 opacity-60">
                  {participant.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {participant.isMuted && <MicOff size={14} className="text-red-500" />}
              <button className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-500 hover:text-white">
                <MoreVertical size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/5 text-center">
        <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em]">
          End-to-End Encrypted Session
        </p>
      </div>
    </div>
  );
};
