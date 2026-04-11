export type ParticipantStatus = "speaking" | "online" | "offline";

export interface Participant {
  id: string;
  name: string;
  role: string;
  status: ParticipantStatus;
  avatarUrl?: string;
  initials: string;
  isOnline: boolean;
  isMuted?: boolean;
  isHandRaised?: boolean;
  isHost?: boolean;
  isSpeaking?: boolean;
}

export interface TranscriptionEntry {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  timestamp: string;
  text: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Meeting {
  id: string;
  projectId: string;
  title: string;
  status: "live" | "ended" | "scheduled";
  startTime: string;
  duration?: string;
  participants: Participant[];
  transcription: TranscriptionEntry[];
}
