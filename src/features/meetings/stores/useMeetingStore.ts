import { create } from "zustand";
import type { Participant, TranscriptionEntry, ChatMessage } from "../types";

interface MeetingState {
  viewMode: "grid" | "transcript";
  isMuted: boolean;
  isVideoOff: boolean;
  isHandRaised: boolean;
  isScreenSharing: boolean;
  duration: number;
  participants: Participant[];
  transcript: TranscriptionEntry[];
  messages: ChatMessage[];
  activeSidePanel: "chat" | "participants" | null;
  
  // Actions
  setViewMode: (mode: "grid" | "transcript") => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  toggleHandRaise: () => void;
  toggleScreenShare: () => void;
  toggleSidebar: (panel: "chat" | "participants" | null) => void;
  sendMessage: (text: string) => void;
  setParticipants: (participants: Participant[]) => void;
  addParticipant: (participant: Participant) => void;
  
  // Simulation intervals
  simulationInterval: any;
  timerInterval: any;
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
  duration: 0,
  participants: INITIAL_PARTICIPANTS,
  transcript: [],
  messages: [],
  activeSidePanel: null,
  simulationInterval: null,
  timerInterval: null,

  setViewMode: (viewMode) => set({ viewMode }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleVideo: () => set((state) => ({ isVideoOff: !state.isVideoOff })),
  toggleHandRaise: () => set((state) => ({ isHandRaised: !state.isHandRaised })),
  toggleScreenShare: () => set((state) => ({ isScreenSharing: !state.isScreenSharing })),
  
  toggleSidebar: (panel) => set((state) => ({ 
    activeSidePanel: state.activeSidePanel === panel ? null : panel 
  })),

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

  startSimulation: () => {
    // Clear existing to avoid leaks
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

    set({ simulationInterval, timerInterval });
  },

  stopSimulation: () => {
    const { simulationInterval, timerInterval } = get();
    if (simulationInterval) clearInterval(simulationInterval);
    if (timerInterval) clearInterval(timerInterval);
    set({ simulationInterval: null, timerInterval: null });
  },
}));
