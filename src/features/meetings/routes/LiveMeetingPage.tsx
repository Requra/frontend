import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectByIdApi } from "@/features/projects/api/getProjects";
import { MeetingTopBar } from "../components/MeetingTopBar";
import { MeetingGridView } from "../components/MeetingGridView";
import { MeetingTranscriptView } from "../components/MeetingTranscriptView";
import { InMeetingControls } from "../components/InMeetingControls";
import type { Participant, TranscriptionEntry } from "../types";
import { Spinner } from "@/components/ui/Spinner/spinner";
import { paths } from "@/routes/paths";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_PARTICIPANTS: Participant[] = [
  { id: "1", name: "Alex Johnson", role: "Product Manager", initials: "AJ", isOnline: true, status: "speaking", avatarUrl: "https://i.pravatar.cc/150?u=1" },
  { id: "2", name: "Sarah Chen", role: "UX Designer", initials: "SC", isOnline: true, status: "online", avatarUrl: "https://i.pravatar.cc/150?u=2" },
  { id: "3", name: "Michael Ross", role: "Lead Dev", initials: "MR", isOnline: true, isMuted: true, status: "online", avatarUrl: "https://i.pravatar.cc/150?u=3" },
  { id: "4", name: "Emily Davis", role: "Stakeholder", initials: "ED", isOnline: false, status: "offline", avatarUrl: "https://i.pravatar.cc/150?u=4" },
];

const INITIAL_TRANSCRIPT: TranscriptionEntry[] = [
  {
    id: "t1",
    participantId: "1",
    participantName: "Alex Johnson",
    participantRole: "PM",
    text: "Thanks everyone for joining. Today we're discussing the new project requirements for the dashboard refactor.",
    timestamp: "10:00 AM"
  },
  {
    id: "t2",
    participantId: "2",
    participantName: "Sarah Chen",
    participantRole: "UX",
    text: "I've updated the Figma files with the high-fidelity mockups. We should focus on the glassmorphism effects we discussed.",
    timestamp: "10:02 AM"
  }
];

export const LiveMeetingPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState<TranscriptionEntry[]>(INITIAL_TRANSCRIPT);
  const [viewMode, setViewMode] = useState<"grid" | "transcript">("grid");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectByIdApi(projectId!),
    enabled: !!projectId,
  });

  // Simulated Live Transcription
  useEffect(() => {
    const liveLines = [
      "The feedback from the stakeholders was quite positive regarding the color palette.",
      "We need to ensure the accessibility contrast ratios are met for the dark mode.",
      "I agree, let's prioritize the mobile-first approach for the initial release.",
      "The backend API should be ready by next Tuesday for integration testing."
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < liveLines.length) {
        const newEntry: TranscriptionEntry = {
          id: `live-${Date.now()}`,
          participantId: index % 2 === 0 ? "3" : "1",
          participantName: index % 2 === 0 ? "Michael Ross" : "Alex Johnson",
          participantRole: index % 2 === 0 ? "Dev" : "PM",
          text: liveLines[index],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setTranscript(prev => [...prev, newEntry]);
        index++;
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-neutral-50/30">
        <Spinner className="size-8" />
      </div>
    );
  }

  const meetingTitle = project ? `${project.name} - Sync Meeting` : "Live Project Meeting";

  return (
    <div className={cn(
      "fixed inset-0 flex flex-col z-50 overflow-hidden transition-colors duration-500",
      viewMode === "grid" ? "bg-neutral-950" : "bg-white"
    )}>
      {/* Top Navigation */}
      <MeetingTopBar 
        title={meetingTitle} 
        duration="12:45"
        participantCount={MOCK_PARTICIPANTS.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* View Content with subtle transition */}
        <div className="flex-1 flex flex-col overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
          {viewMode === "grid" ? (
            <MeetingGridView participants={MOCK_PARTICIPANTS} />
          ) : (
            <MeetingTranscriptView entries={transcript} />
          )}
        </div>

        {/* Floating Premium Controls */}
        <InMeetingControls 
          viewMode={viewMode}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
          isCameraOff={isVideoOff}
          onToggleCamera={() => setIsVideoOff(!isVideoOff)}
          onEndMeeting={() => navigate(paths.app.projects.details(projectId!))}
        />
      </div>
    </div>
  );
};
