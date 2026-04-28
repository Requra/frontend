export interface UserStats {
  projects: number;
  tasks: number;
  completed: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  avatarUrl: string;
  createdAt: string;
  // Existing fields for UI compatibility
  phone?: string;
  location?: string;
  role: string;
  avatar: string;
  stats: UserStats;
}

export interface UserSettings {
  language: "en" | "ar";
  pushNotifications: boolean;
  emailDigests: boolean;
}
