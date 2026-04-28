import { create } from "zustand";
import { getProjectsApi } from "@/features/projects/api/getProjects";
import type { Project } from "@/features/projects/types";
import { ProjectStatus } from "@/features/projects/types/enums";

interface ProjectStats {
  total: number;
  completed: number;
  inProgress: number;
  drafted: number;
  cancelled: number;
}

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  stats: ProjectStats;

  fetchProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  stats: {
    total: 0,
    completed: 0,
    inProgress: 0,
    drafted: 0,
    cancelled: 0,
  },

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetch all projects (using a large limit for stats calculation)
      const response = await getProjectsApi({ limit: 100 });
      
      set({
        projects: response.data,
        stats: {
          total: response.totalCount,
          completed: response.statusCounts[ProjectStatus.Completed] || 0,
          inProgress: response.statusCounts[ProjectStatus.InProgress] || 0,
          drafted: response.statusCounts[ProjectStatus.Drafted] || 0,
          cancelled: response.statusCounts[ProjectStatus.Cancelled] || 0,
        },
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch projects", isLoading: false });
    }
  },
}));
