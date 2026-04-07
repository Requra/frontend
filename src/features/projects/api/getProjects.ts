import { apiClient } from "@/services/api";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/api";
import type { Project } from "../types";
import { ProjectStatus } from "../types/enums";

export interface GetProjectsParams {
  page?: number;
  limit?: number;
  status?: ProjectStatus;
  searchQuery?: string;
}

export interface GetProjectsResponse {
  data: Project[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Fetches projects from the real API and handles local filtering/pagination 
 * if backend requirements aren't provided by the endpoint yet.
 * Senior Practice: Using direct API fields with UI-specific derivations.
 */
export async function getProjectsApi({
  page = 1,
  limit = 6,
  status,
  searchQuery = "",
}: GetProjectsParams = {}): Promise<GetProjectsResponse> {
  try {
    // Call real API: GET /api/projects (without ID to list all)
    const response = await apiClient.get<ApiResponse<Project[]>>("/api/projects");
    
    if (!response.data.isSuccess || !response.data.data) {
      const message = response.data.message || "Failed to fetch projects";
      toast.error(message);
      throw new Error(message);
    }

    // Direct usage of backend models with UI derivations
    const allProjects = response.data.data.map(p => ({
      ...p,
      // Derived fields for UI components that aren't yet in the API
      featuresCount: 0, 
      unsolvedComments: 0,
      progress: p.status === ProjectStatus.Completed ? 100 : 45,
    }));

    // Apply filtering (Status & Search)
    const filtered = allProjects.filter((p) => {
      const statusMatch = !status || p.status === status;
      
      if (!statusMatch) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.clientName.toLowerCase().includes(q)
        );
      }
      return true;
    });

    // Calculate pagination locally to support UI expectations
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      totalCount,
      totalPages,
      currentPage: page,
    };
  } catch (error: any) {
    if (!error.message || error.message === "Failed to fetch projects") {
      toast.error("Network error: Unable to load projects.");
    }
    throw error;
  }
}

/**
 * Utility to fetch a single project by ID.
 * Senior Practice: Using direct API response for UI model consistency.
 */
export async function getProjectByIdApi(id: string): Promise<Project> {
  try {
    const response = await apiClient.get<ApiResponse<Project>>(`/api/projects`, {
      params: { id },
    });

    if (!response.data.isSuccess || !response.data.data) {
      const message = response.data.message || "Project not found";
      toast.error(message);
      throw new Error(message);
    }

    const project = response.data.data;
    return {
      ...project,
      featuresCount: 0,
      unsolvedComments: 0,
      progress: project.status === ProjectStatus.Completed ? 100 : 45,
    };
  } catch (error: any) {
    if (!error.message || error.message === "Project not found") {
      toast.error("Network error: Unable to load project details.");
    }
    throw error;
  }
}
