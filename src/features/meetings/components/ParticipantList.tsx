import React from "react";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Mic, MicOff, MoreHorizontal, Search } from "lucide-react";
import type { Participant } from "../types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button/Button";

interface ParticipantListProps {
  participants: Participant[];
}

export const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
}) => {
  return (
    <div className="w-80 h-full bg-white border-l border-neutral-100 flex flex-col shrink-0 z-20">
      <div className="p-6 border-b border-neutral-50">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-neutral-900 flex items-center gap-2.5">
            Participants
            <span className="bg-primary-50 text-primary-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-primary-100/50">
              {participants.length}
            </span>
          </h3>
        </div>
        
        <div className="relative group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Find someone..." 
            className="w-full bg-neutral-100/50 border-none rounded-xl py-2 pl-9 pr-4 text-xs font-semibold focus:ring-2 focus:ring-primary-100 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-neutral-200">
        {participants.map((p) => (
          <div 
            key={p.id} 
            className={cn(
              "group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 cursor-pointer",
              "hover:bg-neutral-50 active:scale-[0.98]",
              !p.isOnline && "opacity-50 grayscale-[0.2]"
            )}
          >
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <Avatar src={p.avatarUrl} fallback={p.initials} className="h-9 w-9 border-2 border-transparent transition-all group-hover:border-primary-100 shadow-sm" />
                {p.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full transition-transform scale-110 group-hover:scale-125" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-neutral-800 group-hover:text-primary-900 transition-colors">
                  {p.name}
                </span>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide group-hover:text-neutral-500">
                  {p.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
               {p.isMuted ? (
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-500 bg-red-50 rounded-lg">
                   <MicOff size={14} />
                 </Button>
               ) : (
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-primary-500 bg-neutral-100/50 rounded-lg hover:bg-primary-50">
                    <Mic size={14} />
                 </Button>
               )}
               <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg">
                 <MoreHorizontal size={16} />
               </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer / Add Invitations */}
      <div className="p-4 border-t border-neutral-50 bg-neutral-50/50">
        <Button className="w-full rounded-2xl font-black text-xs uppercase tracking-widest h-11 shadow-lg shadow-primary-200/50 bg-primary-600 hover:bg-primary-700 active:scale-[0.98] transition-all">
          Invite Others
        </Button>
      </div>
    </div>
  );
};
