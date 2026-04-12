import React from "react";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Hand, 
  Smile, 
  Users, 
  MessageSquare, 
  MoreHorizontal,
  ScreenShare,
  UserPlus,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { useMeetingStore } from "../stores/useMeetingStore";

interface InMeetingControlsProps {
  onEndMeeting: () => void;
  className?: string;
}

export const InMeetingControls: React.FC<InMeetingControlsProps> = ({
  onEndMeeting,
  className,
}) => {
  const { 
    viewMode, 
    isMuted, 
    isVideoOff, 
    isHandRaised,
    isScreenSharing,
    isRecording,
    participants,
    toggleMute, 
    toggleVideo,
    toggleHandRaise,
    toggleScreenShare,
    toggleRecording,
    toggleSidebar,
    setInviteModalOpen
  } = useMeetingStore();

  return (
    <div className={cn(
      "fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50 transition-all duration-500",
      viewMode === "grid" ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none",
      className
    )}>
      {/* Main Control Bar */}
      <div className="flex items-center p-2 bg-neutral-900/80 backdrop-blur-3xl border border-white/5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Media Controls */}
        <div className="flex items-center px-1">
          <ControlButton
            icon={isMuted ? MicOff : Mic}
            label={isMuted ? "Unmute" : "Mute"}
            onClick={toggleMute}
            className={isMuted ? "text-red-400 bg-red-400/10 hover:bg-red-400/20" : ""}
          />
          <ControlButton
            icon={isVideoOff ? VideoOff : Video}
            label={isVideoOff ? "Start Video" : "Stop Video"}
            onClick={toggleVideo}
            className={isVideoOff ? "text-red-400 bg-red-400/10 hover:bg-red-400/20" : ""}
          />
        </div>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Interaction Controls */}
        <div className="flex items-center px-1">
          <ControlButton
            icon={ScreenShare}
            label="Share Screen"
            onClick={toggleScreenShare}
            className={isScreenSharing ? "text-primary-400 bg-primary-400/10 hover:bg-primary-400/20" : ""}
          />
          <ControlButton
            icon={Hand}
            label="Raise Hand"
            onClick={toggleHandRaise}
            className={isHandRaised ? "text-primary-400 bg-primary-400/10 hover:bg-primary-400/20" : ""}
          />
          <ControlButton
            icon={Smile}
            label="Reactions"
            onClick={() => {}}
          />
        </div>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Info & View Controls */}
        <div className="flex items-center px-1">
          <ControlButton
            icon={Users}
            label="Participants"
            badge={participants.length}
            onClick={() => toggleSidebar("participants")}
          />
          <ControlButton
            icon={MessageSquare}
            label="Chat"
            onClick={() => toggleSidebar("chat")}
          />
          <ControlButton
            icon={UserPlus}
            label="Invite People"
            onClick={() => setInviteModalOpen(true)}
            className="text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20"
          />
          <ControlButton
            icon={Circle}
            label={isRecording ? "Stop Recording" : "Start Recording"}
            onClick={toggleRecording}
            className={cn(
              isRecording ? "text-red-400 bg-red-400/20 hover:bg-red-400/30 ring-1 ring-red-400/50" : ""
            )}
          />
          <ControlButton
            icon={MoreHorizontal}
            label="More Options"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* End Meeting Button (Distinct) */}
      <Tooltip content="End Meeting" position="top">
        <button
          onClick={onEndMeeting}
          className="h-14 w-14 flex items-center justify-center rounded-2xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 transition-all active:scale-95 group"
        >
          <PhoneOff size={24} className="transition-transform group-hover:-rotate-135" />
        </button>
      </Tooltip>
    </div>
  );
};

interface ControlButtonProps {
  icon: any;
  label: string;
  onClick: () => void;
  badge?: number;
  className?: string;
}

const ControlButton: React.FC<ControlButtonProps> = ({ 
  icon: Icon, 
  label, 
  onClick, 
  badge,
  className
}) => {
  return (
    <Tooltip content={label} position="top">
      <button
        onClick={onClick}
        className={cn(
          "h-11 w-11 flex items-center justify-center rounded-2xl transition-all relative overflow-hidden",
          "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white",
          className
        )}
      >
        <Icon size={20} />
        {badge !== undefined && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-neutral-900">
            {badge}
          </span>
        )}
      </button>
    </Tooltip>
  );
};
