import { MOCK_PROJECTS } from "../constants";
import type { Project } from "../types";
import type { ProjectStatus } from "../components/ProjectCard/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface GetProjectsParams {
  page: number;
  limit: number;
  status: ProjectStatus;
  searchQuery?: string;
}

export interface GetProjectsResponse {
  data: Project[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Simulated API call to fetch projects with pagination, status filtering, and search.
 */
export async function getProjectsApi({
  page = 1,
  limit = 6,
  status,
  searchQuery = "",
}: GetProjectsParams): Promise<GetProjectsResponse> {
  // Simulate network latency (between 600ms and 1200ms)
  await delay(600 + Math.random() * 600);

  // Filter by status and search query
  const filtered = MOCK_PROJECTS.filter((p) => {
    if (p.status !== status) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.userName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate pagination
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
