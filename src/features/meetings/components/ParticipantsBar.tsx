import React from "react";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { MessageSquare, Users2 } from "lucide-react";
import type { Participant } from "../types";

interface ParticipantsBarProps {
  participants: Participant[];
  onlineCount: number;
  onOpenChat?: () => void;
}

export const ParticipantsBar: React.FC<ParticipantsBarProps> = ({
  participants,
  onlineCount,
  onOpenChat,
}) => {
  return (
    <div className="w-full h-[50px] bg-white border-b border-neutral-100 flex items-center justify-between px-6 shrink-0 z-25 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-neutral-600 font-semibold text-sm mr-2">
          <Users2 size={18} className="text-neutral-400" />
          <span>Participants</span>
        </div>

        <div className="flex -space-x-2">
          {participants.slice(0, 4).map((p) => (
            <Avatar 
              key={p.id} 
              src={p.avatarUrl} 
              fallback={p.initials} 
              title={p.name}
              className="h-7 w-7 border-2 border-white ring-offset-2 ring-OFFSET-4" 
            />
          ))}
          {participants.length > 4 && (
            <div className="h-7 w-7 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-neutral-500 z-10">
              +{participants.length - 4}
            </div>
          )}
        </div>

        <div className="h-4 w-px bg-neutral-200 mx-1" />

        <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100/50 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          {onlineCount} Online
        </div>
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 rounded-lg font-bold text-primary-600 hover:bg-primary-50 px-4 group flex items-center gap-2"
        onClick={onOpenChat}
      >
        <div className="relative">
          <MessageSquare size={16} className="text-primary-500 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
        </div>
        Chat
      </Button>
    </div>
  );
};
