import { apiClient } from "@/services/api";
import type { ApiResponse } from "@/types/api";
import type { ApiProject, Project } from "../types";
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
 * Transforms a backend project DTO to a frontend UI model.
 * Senior practice: Decouple backend from frontend models.
 */
function transformProject(apiProject: ApiProject): Project {
  return {
    id: apiProject.id,
    title: apiProject.name, // Mapping from 'name' to 'title'
    description: apiProject.description,
    status: apiProject.status,
    clientName: apiProject.clientName,
    teamMembers: apiProject.teamMembers,
    createdAt: apiProject.createdAt,
    // Derived or missing fields
    featuresCount: 0, // Placeholder if not in API yet
    unsolvedComments: 0, // Placeholder if not in API yet
    userName: apiProject.clientName, // Deriving userName from clientName for UI consistency
    progress: apiProject.status === ProjectStatus.Completed ? 100 : 45, // Basic estimation for UI
  };
}

/**
 * Fetches projects from the real API and handles local filtering/pagination 
 * if backend requirements aren't provided by the endpoint yet.
 */
export async function getProjectsApi({
  page = 1,
  limit = 6,
  status,
  searchQuery = "",
}: GetProjectsParams = {}): Promise<GetProjectsResponse> {
  // Call real API: GET /api/projects (without ID to list all)
  const response = await apiClient.get<ApiResponse<ApiProject[]>>("/api/projects");
  
  if (!response.data.isSuccess || !response.data.data) {
    throw new Error(response.data.message || "Failed to fetch projects");
  }

  // Transform backend models to frontend models
  const allProjects = response.data.data.map(transformProject);

  // Apply filtering (Status & Search)
  const filtered = allProjects.filter((p) => {
    const statusMatch = !status || p.status === status;
    
    if (!statusMatch) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.userName.toLowerCase().includes(q) ||
        p.clientName?.toLowerCase().includes(q)
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
}

/**
 * Utility to fetch a single project by ID.
 * Senior Practice: Explicitly named services for clear intent.
 */
export async function getProjectByIdApi(id: string): Promise<Project> {
  const response = await apiClient.get<ApiResponse<ApiProject>>(`/api/projects`, {
    params: { id },
  });

  if (!response.data.isSuccess || !response.data.data) {
    throw new Error(response.data.message || "Project not found");
  }

  return transformProject(response.data.data);
}
