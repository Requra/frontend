import type { UserProfile, UserSettings } from "../types";
// import { apiClient } from "@/services/api";
// import type { ApiResponse } from "@/types/api";

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
    try {
      // Simulate PUT /api/profile
      console.log("Calling PUT /api/profile with:", data);
      await delay(1200);
      
      // In a real app:
      // const response = await apiClient.put<ApiResponse<UserProfile>>("/api/profile", data);
      // return response.data.data;

      return { ...MOCK_PROFILE, ...data };
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  updateSettings: async (data: Partial<UserSettings>): Promise<UserSettings> => {
    await delay(500);
    console.log("Updating settings with:", data);
    return { ...MOCK_SETTINGS, ...data };
  },

  updateAvatar: async (file: File): Promise<{ avatar: string }> => {
    try {
      // Simulate POST /api/profile/avatar
      console.log("Calling POST /api/profile/avatar with file:", file.name);
      await delay(1500);

      // In a real app:
      // const formData = new FormData();
      // formData.append('avatar', file);
      // const response = await apiClient.post<ApiResponse<{avatar: string}>>("/api/profile/avatar", formData);
      // return response.data.data;

      // Mock successful response with local preview URL
      return { avatar: URL.createObjectURL(file) };
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  },

  changePassword: async (data: any): Promise<void> => {
    try {
      console.log("Calling PUT /api/profile/change-password with:", data);
      await delay(1500);
      // Real implementation:
      // await apiClient.put("/api/profile/change-password", data);
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },
};
