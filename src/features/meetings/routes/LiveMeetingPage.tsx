import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectByIdApi } from "@/features/projects/api/getProjects";
import { MeetingTopBar } from "../components/MeetingTopBar";
import { MeetingGridView } from "../components/MeetingGridView";
import { MeetingTranscriptView } from "../components/MeetingTranscriptView";
import { InMeetingControls } from "../components/InMeetingControls";
import { ParticipantList } from "../components/ParticipantList";
import { useMeetingStore } from "../stores/useMeetingStore";
import { Spinner } from "@/components/ui/Spinner/spinner";
import { paths } from "@/routes/paths";
import { cn } from "@/lib/utils";
import type { Participant } from "../types";
import { MeetingChatPanel } from "../components/MeetingChatPanel";
import { InviteMembersModal } from "../components/InviteMembersModal";

// Initial Mock Participants 
const MOCK_PARTICIPANTS: Participant[] = [
  { id: "1", name: "Alex Johnson", role: "Product Manager", initials: "AJ", isOnline: true, status: "online", avatarUrl: "https://i.pravatar.cc/150?u=1" },
  { id: "2", name: "Sarah Chen", role: "UX Designer", initials: "SC", isOnline: true, status: "online", avatarUrl: "https://i.pravatar.cc/150?u=2" },
  { id: "3", name: "Michael Ross", role: "Lead Dev", initials: "MR", isOnline: true, isMuted: true, status: "online", avatarUrl: "https://i.pravatar.cc/150?u=3" },
  { id: "4", name: "Emily Davis", role: "Stakeholder", initials: "ED", isOnline: false, status: "offline", avatarUrl: "https://i.pravatar.cc/150?u=4" },
];

export const LiveMeetingPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const { 
    viewMode, 
    activeSidePanel,
    transcript,
    participants,
    setParticipants,
    startSimulation,
    stopSimulation,
    generateMeetingLink 
  } = useMeetingStore();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectByIdApi(projectId!),
    enabled: !!projectId,
  });

  useEffect(() => {
    if (projectId) {
      generateMeetingLink(projectId);
    }
    setParticipants(MOCK_PARTICIPANTS);
    startSimulation();
    return () => stopSimulation();
  }, [projectId, generateMeetingLink, setParticipants, startSimulation, stopSimulation]);

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
      viewMode === "grid" ? "bg-neutral-950" : "bg-white",
      "selection:bg-primary-100"
    )}>
      <MeetingTopBar title={meetingTitle} />

      <div className="flex-1 flex flex-row overflow-hidden relative">
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 bg-linear-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
            {viewMode === "grid" ? (
              <MeetingGridView participants={participants} />
            ) : (
              <MeetingTranscriptView entries={transcript} />
            )}
          </div>

          <InMeetingControls 
            onEndMeeting={() => navigate(projectId ? paths.app.projects.details(projectId) : "/meetings")}
          />
        </div>

        {/* Dynamic Side Panels */}
        <div className={cn(
          "transition-all duration-500 ease-in-out flex h-full",
          activeSidePanel ? "translate-x-0 w-80" : "translate-x-full w-0"
        )}>
          {activeSidePanel === "chat" && <MeetingChatPanel />}
          {activeSidePanel === "participants" && <ParticipantList participants={participants} />}
        </div>
      </div>
      
      <InviteMembersModal />
    </div>
  );
};
