export interface UserStats {
  projects: number;
  tasks: number;
  completed: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  avatar: string;
  stats: UserStats;
}

export interface UserSettings {
  language: "en" | "ar";
  pushNotifications: boolean;
  emailDigests: boolean;
}
