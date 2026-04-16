import { create } from "zustand";
import type { Participant, TranscriptionEntry, ChatMessage, Invitation } from "../types";

interface MeetingState {
  viewMode: "grid" | "transcript";
  isMuted: boolean;
  isVideoOff: boolean;
  isHandRaised: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
  duration: number;
  participants: Participant[];
  joinRequests: Participant[];
  transcript: TranscriptionEntry[];
  messages: ChatMessage[];
  activeSidePanel: "chat" | "participants" | null;
  isInviteModalOpen: boolean;
  pendingInvites: Invitation[];
  meetingLink: string;
  
  // Actions
  setViewMode: (mode: "grid" | "transcript") => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  toggleHandRaise: () => void;
  toggleScreenShare: () => void;
  toggleRecording: () => void;
  toggleSidebar: (panel: "chat" | "participants" | null) => void;
  setInviteModalOpen: (open: boolean) => void;
  sendMessage: (text: string) => void;
  setParticipants: (participants: Participant[]) => void;
  addParticipant: (participant: Participant) => void;
  addJoinRequest: (participant: Participant) => void;
  onAdmitParticipant: (id: string) => void;
  onDenyParticipant: (id: string) => void;
  sendInvite: (invite: Omit<Invitation, "id" | "invitedAt" | "status">) => void;
  generateMeetingLink: (meetingId: string) => void;
  
  // Simulation intervals
  simulationInterval: any;
  timerInterval: any;
  inviteSimulationInterval: any;
  startSimulation: () => void;
  stopSimulation: () => void;
}

const INITIAL_PARTICIPANTS: Participant[] = [
  { id: "1", name: "Alex Johnson", role: "Product Manager", initials: "AJ", isOnline: true, isMuted: false, status: "online" },
  { id: "2", name: "Sarah Chen", role: "Lead Designer", initials: "SC", isOnline: true, isMuted: true, status: "online" },
  { id: "3", name: "Marcus Rodriguez", role: "Sr. Developer", initials: "MR", isOnline: true, isMuted: false, status: "online" },
  { id: "4", name: "Elena Volkov", role: "UX Researcher", initials: "EV", isOnline: true, isMuted: true, status: "online" },
];

export const useMeetingStore = create<MeetingState>((set, get) => ({
  viewMode: "grid",
  isMuted: false,
  isVideoOff: false,
  isHandRaised: false,
  isScreenSharing: false,
  isRecording: false,
  duration: 0,
  participants: INITIAL_PARTICIPANTS,
  joinRequests: [],
  transcript: [],
  messages: [],
  activeSidePanel: null,
  isInviteModalOpen: false,
  pendingInvites: [],
  meetingLink: "",
  simulationInterval: null,
  timerInterval: null,
  inviteSimulationInterval: null,

  setViewMode: (viewMode) => set({ viewMode }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleVideo: () => set((state) => ({ isVideoOff: !state.isVideoOff })),
  toggleHandRaise: () => set((state) => ({ isHandRaised: !state.isHandRaised })),
  toggleScreenShare: () => set((state) => ({ isScreenSharing: !state.isScreenSharing })),
  toggleRecording: () => set((state) => ({ isRecording: !state.isRecording })),
  
  toggleSidebar: (panel) => set((state) => ({ 
    activeSidePanel: state.activeSidePanel === panel ? null : panel 
  })),

  setInviteModalOpen: (isInviteModalOpen) => set({ isInviteModalOpen }),

  sendMessage: (text) => set((state) => ({
    messages: [...state.messages, {
      id: `msg-${Date.now()}`,
      senderId: "me",
      senderName: "You",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]
  })),

  setParticipants: (participants) => set({ participants }),

  addParticipant: (participant) => set((state) => ({
    participants: [...state.participants, participant]
  })),

  addJoinRequest: (participant) => set((state) => ({
    joinRequests: [...state.joinRequests, participant]
  })),

  onAdmitParticipant: (id) => set((state) => {
    const participant = state.joinRequests.find(p => p.id === id);
    if (!participant) return state;
    return {
      joinRequests: state.joinRequests.filter(p => p.id !== id),
      participants: [...state.participants, { ...participant, isOnline: true, status: "online" }]
    };
  }),

  onDenyParticipant: (id) => set((state) => ({
    joinRequests: state.joinRequests.filter(p => p.id !== id)
  })),

  sendInvite: (inviteData) => set((state) => ({
    pendingInvites: [...state.pendingInvites, {
      ...inviteData,
      id: `inv-${Date.now()}`,
      status: "pending",
      invitedAt: new Date().toISOString()
    }]
  })),

  generateMeetingLink: (meetingId) => {
    const baseUrl = window.location.origin;
    set({ meetingLink: `${baseUrl}/meetings/${meetingId}/join` });
  },

  startSimulation: () => {
    const current = get();
    if (current.simulationInterval) clearInterval(current.simulationInterval);
    if (current.timerInterval) clearInterval(current.timerInterval);

    const simulationInterval = setInterval(() => {
      const state = get();
      const speakers = state.participants.filter(p => p.isOnline && !p.isMuted);
      if (speakers.length === 0) return;

      const speaker = speakers[Math.floor(Math.random() * speakers.length)];
      
      const lines = [
        "We need to optimize the SVG rendering for the dashboard components.",
        "The HSL color tokens are looking much better in the latest Figma build.",
        "Let's ensure the Zustand store handles the persistence for the user preferences.",
        "The micro-animations should have a spring transition for a more organic feel.",
        "I'm seeing some layout shifts on mobile, we should address the CLS issues.",
        "The API response time is down by 40% after the indexing refactor."
      ];
      
      const newEntry: TranscriptionEntry = {
        id: `t-${Date.now()}`,
        participantId: speaker.id,
        participantName: speaker.name,
        participantRole: speaker.role || "Team",
        text: lines[Math.floor(Math.random() * lines.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      set({ 
        transcript: [...state.transcript, newEntry],
        participants: state.participants.map(p => ({
          ...p,
          status: p.id === speaker.id ? 'speaking' : 'online'
        }))
      });
    }, 12000);

    const timerInterval = setInterval(() => {
      set(state => ({ duration: state.duration + 1 }));
    }, 1000);

    const inviteSimulationInterval = setInterval(() => {
      const state = get();
      if (state.joinRequests.length > 0) return; // Only one request at a time for demo

      const guests = [
        { id: "g-1", name: "Oliver Smith", role: "Frontend Dev", initials: "OS" },
        { id: "g-2", name: "Emma Watson", role: "Designer", initials: "EW" },
        { id: "g-3", name: "Noah Brown", role: "Architect", initials: "NB" },
      ];

      const guest = guests[Math.floor(Math.random() * guests.length)];
      get().addJoinRequest({
        ...guest,
        isOnline: false,
        isMuted: true,
        status: "online"
      });
    }, 45000); // Trigger a request every 45s for realism

    set({ simulationInterval, timerInterval, inviteSimulationInterval });
  },

  stopSimulation: () => {
    const { simulationInterval, timerInterval, inviteSimulationInterval } = get();
    if (simulationInterval) clearInterval(simulationInterval);
    if (timerInterval) clearInterval(timerInterval);
    if (inviteSimulationInterval) clearInterval(inviteSimulationInterval);
    set({ simulationInterval: null, timerInterval: null, inviteSimulationInterval: null });
  },
}));
