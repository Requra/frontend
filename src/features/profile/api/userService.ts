import type { UserProfile, UserSettings } from "../types";

/**
 * Mock API service for user-related operations.
 * Designed to be easily replaced with real Axios/Fetch calls.
 */

const MOCK_PROFILE: UserProfile = {
  name: "Shawky",
  email: "shawky@gmail.com",
  phone: "010xxxxxxxx",
  location: "Cairo, Egypt",
  role: "Project Manager",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shawky",
  stats: {
    projects: 12,
    tasks: 48,
    completed: 36,
  },
};

const MOCK_SETTINGS: UserSettings = {
  language: "en",
  pushNotifications: true,
  emailDigests: false,
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const userService = {
  getUserProfile: async (): Promise<UserProfile> => {
    await delay(1000); // Simulate API latency
    return { ...MOCK_PROFILE };
  },

  getUserSettings: async (): Promise<UserSettings> => {
    await delay(800);
    return { ...MOCK_SETTINGS };
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    await delay(1200);
    console.log("Updating profile with:", data);
    return { ...MOCK_PROFILE, ...data };
  },

  updateSettings: async (data: Partial<UserSettings>): Promise<UserSettings> => {
    await delay(500);
    console.log("Updating settings with:", data);
    return { ...MOCK_SETTINGS, ...data };
  },
};
