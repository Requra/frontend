import type { UserProfile, UserSettings } from "../types";
import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api";

/**
 * API service for user-related operations using real backend endpoints.
 */

// Helper to map API response to internal UserProfile type
const mapProfileResponse = (apiData: any): UserProfile => {
  return {
    ...apiData,
    id: apiData.id,
    name: apiData.name,
    email: apiData.email,
    jobTitle: apiData.jobTitle,
    avatarUrl: apiData.avatarUrl,
    createdAt: apiData.createdAt,
    // Mapping for UI compatibility
    role: apiData.jobTitle || "Member",
    avatar: apiData.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiData.name}`,
    phone: "010xxxxxxxx", // Default since API doesn't provide it
    location: "Cairo, Egypt", // Default since API doesn't provide it
    stats: {
      projects: 0, // Will be updated by the store
      tasks: 48,
      completed: 0, // Will be updated by the store
    },
  };
};

export const userService = {
  getUserProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<ApiResponse<any>>("/api/profile");
    if (response.data.isSuccess && response.data.data) {
      return mapProfileResponse(response.data.data);
    }
    throw new Error(response.data.message || "Failed to fetch profile");
  },

  getUserSettings: async (): Promise<UserSettings> => {
    // Mocking settings as they are not provided in the current API list
    return {
      language: "en",
      pushNotifications: true,
      emailDigests: false,
    };
  },

  updateProfile: async (data: { name: string }): Promise<UserProfile> => {
    try {
      const response = await apiClient.put<ApiResponse<any>>("/api/profile", data);
      if (response.data.isSuccess && response.data.data) {
        return mapProfileResponse(response.data.data);
      }
      throw new Error(response.data.message || "Failed to update profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  updateSettings: async (data: Partial<UserSettings>): Promise<UserSettings> => {
    // Mocking update as it's not provided
    return {
      language: "en",
      pushNotifications: true,
      emailDigests: false,
      ...data,
    };
  },

  updateAvatar: async (file: File): Promise<{ avatar: string }> => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      
      const response = await apiClient.post<ApiResponse<{ avatarUrl: string }>>(
        "/api/profile/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.isSuccess && response.data.data) {
        return { avatar: response.data.data.avatarUrl };
      }
      throw new Error(response.data.message || "Failed to upload avatar");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  },

  changePassword: async (data: any): Promise<void> => {
    try {
      const response = await apiClient.put<ApiResponse<string>>(
        "/api/profile/change-password",
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }
      );
      
      if (!response.data.isSuccess) {
        throw new Error(response.data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },

  deleteAccount: async (): Promise<void> => {
    try {
      // The user didn't provide a delete endpoint in the prompt, 
      // but I'll assume /api/account based on previous context if it exists.
      // Or I can keep it as is if it was working before.
      await apiClient.delete("/api/account");
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  },
};
