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
  statusCounts: Record<number, number>;
}


/**
 * Normalizes backend statuses (string or number) to the frontend numeric enum.
 * Handles common string mocks and returns InProgress (0) as fallback.
 */
function normalizeStatus(status: any): ProjectStatus {
  if (typeof status === 'number') return status as ProjectStatus;
  
  // Minimal fallback for common enum string representations
  const s = String(status).toLowerCase();
  if (s.includes('progress')) return ProjectStatus.InProgress;
  if (s.includes('completed')) return ProjectStatus.Completed;
  if (s.includes('draft')) return ProjectStatus.Drafted;
  if (s.includes('cancel')) return ProjectStatus.Cancelled;
  
  return ProjectStatus.InProgress;
}

/**
 * Fetches projects from the real API and handles local filtering/pagination 
 * if backend requirements aren't provided by the endpoint yet.
 * Senior Practice: Using direct API fields with UI-specific derivations.
 */
export async function getProjectsApi({
  page = 1,
  limit = 6,
  status: filterStatus,
  searchQuery = "",
}: GetProjectsParams = {}): Promise<GetProjectsResponse> {
  try {
    // Call real API: GET /api/projects
    const response = await apiClient.get<ApiResponse<{ items: Project[]; totalCount: number }>>("/api/projects");
    
    if (!response.data.isSuccess || !response.data.data) {
      const message = response.data.message || "Failed to fetch projects";
      toast.error(message);
      throw new Error(message);
    }

    // Extract items from paginated response
    const rawItems = response.data.data.items || [];

    // Direct usage of backend models with UI derivations
    const allProjects = rawItems.map(p => {
      const normalizedStatus = normalizeStatus(p.status);
      return {
        ...p,
        status: normalizedStatus,
        // Derived fields for UI components that aren't yet in the API
        featuresCount: p.totalRequirements ?? p.totalUserStories ?? 0, 
        unsolvedComments: p.totalComments ?? 0,
        progress: normalizedStatus === ProjectStatus.Completed ? 100 : 45,
      };
    });

    // Apply filtering (Status & Search)
    const filtered = allProjects.filter((p) => {
      const statusMatch = !filterStatus || p.status === filterStatus;
      
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

    // Calculate counts for all statuses
    const statusCounts: Record<number, number> = {
      [ProjectStatus.InProgress]: allProjects.filter(p => p.status === ProjectStatus.InProgress).length,
      [ProjectStatus.Drafted]:    allProjects.filter(p => p.status === ProjectStatus.Drafted).length,
      [ProjectStatus.Completed]:  allProjects.filter(p => p.status === ProjectStatus.Completed).length,
      [ProjectStatus.Cancelled]:  allProjects.filter(p => p.status === ProjectStatus.Cancelled).length,
    };


    // Pagination for the filtered list
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);
    
    return {
      data: paginatedData,
      totalCount,
      totalPages,
      currentPage: page,
      statusCounts,
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
    const response = await apiClient.get<ApiResponse<Project>>(`/api/projects/${id}`);

    if (!response.data.isSuccess || !response.data.data) {
      const message = response.data.message || "Project not found";
      toast.error(message);
      throw new Error(message);
    }

    const project = response.data.data;
    const normalizedStatus = normalizeStatus(project.status);
    
    return {
      ...project,
      status: normalizedStatus,
      featuresCount: 0,
      unsolvedComments: 0,
      progress: normalizedStatus === ProjectStatus.Completed ? 100 : 45,
    };
  } catch (error: any) {
    if (!error.message || error.message === "Project not found") {
      toast.error("Network error: Unable to load project details.");
    }
    throw error;
  }
}
