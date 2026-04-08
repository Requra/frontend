import { 
  ProjectStatus, 
  DocumentStatus, 
  DocumentType,
  UserStoryStatus,
  UserStoryPriority,
  ProjectRole,
  RequirementStatus,
  RequirementType,
  CommentStatus
} from "./types/enums";

export { ProjectStatus, ProjectRole, DocumentStatus, DocumentType, UserStoryStatus, UserStoryPriority, RequirementStatus, RequirementType, CommentStatus };

// --- Data Models (Synchronized with Backend API) ---

export interface Project {
  id: string;
  name: string; // Backend: 'name'
  description: string;
  status: ProjectStatus;
  clientName: string;
  projectType?: string; // Optional — may not be returned by backend yet
  teamMembers?: { email: string; role: ProjectRole }[]; // Made optional
  createdAt: string;
  totalRequirements?: number;
  totalUserStories?: number;
  totalComments?: number;
  // UI-only derived fields (Optional)
  progress?: number;
  featuresCount?: number;
  unsolvedComments?: number;
}

export interface Comment {
  id: string;
  userStoryId: string;
  authorId: string;
  status: CommentStatus;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStory {
  id: string;
  title: string; // Backend: 'title'
  description: string | null;
  acceptanceCriteria: string[];
  status: UserStoryStatus;
  priority: UserStoryPriority;
  language: number;
  creatorId: string;
  requirementId: string;
  jiraTicket: string;
  createdAt: string;
  updatedAt: string;
  totalComments: number;
  comments: Comment[];
  // UI-only derivation (Optional)
  qualityScore?: number;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  upload_date: string; // Backend: 'upload_date'
  status: DocumentStatus;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  type: RequirementType;
  status: RequirementStatus;
  projectId: string;
  createdAt: string;
}

// --- API Request / Response Shapes ---

/** PATCH /api/projects — partial update payload */
export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  clientName?: string;
  status?: number;
  teamMembers?: { email: string }[];
}

/** File tracked by the upload UI (useFileUpload hook + UploadedFileCard) */
export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  errorMessage?: string;
}

/** Shape of the projects query cache — used for optimistic updates */
export interface ProjectsQueryData {
  data: Project[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  statusCounts: Record<number, number>;
}

// --- UI Utilities ---

export interface TabConfig {
  value: string;
  label: string;
  icon: React.ReactNode;
  status: ProjectStatus;
  emptyMessage: string;
}

export interface ProjectGridProps {
  value: string;
  projects: Project[];
  onAdd: () => void;
  emptyMessage: string;
  isFiltering: boolean;
}
