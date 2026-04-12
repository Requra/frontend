import type { Participant } from "../types";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { JoinRequestToast } from "./JoinRequestToast";

interface MeetingGridViewProps {
  participants: Participant[];
}

export const MeetingGridView = ({ participants }: MeetingGridViewProps) => {
  return (
    <div className="flex-1 p-6 flex flex-col items-center justify-center bg-neutral-950">
      <JoinRequestToast />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl aspect-video md:aspect-auto h-full max-h-[80vh]">
        {participants.slice(0, 4).map((participant) => (
          <ParticipantCard key={participant.id} participant={participant} />
        ))}
      </div>
    </div>
  );
};

const ParticipantCard = ({ participant }: { participant: Participant }) => {
  const isSpeaking = participant.status === "speaking";
  
  return (
    <div className={cn(
      "relative group rounded-4xl overflow-hidden bg-neutral-900/40 border transition-all duration-500 flex flex-col items-center justify-center shadow-2xl",
      isSpeaking ? "border-primary-500 ring-1 ring-primary-500/50 scale-[1.01]" : "border-white/5 hover:border-white/10"
    )}>
      {/* Speaking Glow */}
      {isSpeaking && (
        <div className="absolute inset-0 bg-primary-500/5 opacity-50 animate-pulse pointer-events-none" />
      )}

      {/* Avatar Center */}
      <div className="relative">
        <div className={cn(
          "size-28 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-neutral-950 shadow-2xl transition-transform duration-500 group-hover:scale-105",
          participant.id === "1" ? "bg-primary-500 text-white" :
          participant.id === "2" ? "bg-emerald-500 text-white" :
          participant.id === "3" ? "bg-orange-500 text-white" :
          "bg-blue-500 text-white"
        )}>
          {participant.initials}
        </div>
        {/* Dynamic Voice Wave (if speaking) */}
        {isSpeaking && (
          <div className="absolute -inset-4 border-2 border-primary-500/30 rounded-full animate-ping opacity-40" />
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-neutral-950/80 to-transparent pointer-events-none" />
      
      {/* Bottom Info */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white drop-shadow-md">
            {participant.name}
            {participant.id === "1" && <span className="ml-1 text-white/60 font-normal group-hover:text-white/80 transition-colors">(You)</span>}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-neutral-900/60 backdrop-blur-md border border-white/5 text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
            {participant.role || "Participant"}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-2 rounded-xl backdrop-blur-md border transition-all",
            participant.isMuted ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-neutral-950/40 border-white/5 text-neutral-400"
          )}>
            {participant.isMuted ? <MicOff size={14} /> : <Mic size={14} className={isSpeaking ? "text-primary-400 animate-pulse" : ""} />}
          </div>
        </div>
      </div>

      {/* Top Right: Status Icon */}
      {isSpeaking && (
        <div className="absolute top-6 right-6 p-2 bg-primary-500/20 backdrop-blur-md rounded-xl border border-primary-500/30 text-primary-400">
          <div className="flex gap-0.5 items-end h-3">
            <div className="w-0.5 bg-current animate-[bounce_1s_infinite_0ms] h-full" />
            <div className="w-0.5 bg-current animate-[bounce_1s_infinite_200ms] h-2/3" />
            <div className="w-0.5 bg-current animate-[bounce_1s_infinite_400ms] h-1/2" />
          </div>
        </div>
      )}
    </div>
  );
};
