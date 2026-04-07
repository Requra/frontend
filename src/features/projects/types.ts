import { 
  ProjectStatus, 
  DocumentStatus, 
  DocumentType,
  UserStoryStatus,
  UserStoryPriority,
  ProjectRole,
  RequirementStatus,
  RequirementType
} from "./types/enums";

export { ProjectStatus, ProjectRole, DocumentStatus, DocumentType, UserStoryStatus, UserStoryPriority, RequirementStatus, RequirementType };

// --- API Data Transfer Objects (DTOs) ---
// These match the backend contract directly (OAS)

export interface ApiProject {
  id: string;
  name: string; // Map to title in UI
  description: string;
  status: ProjectStatus; // Backend status as enum
  clientName: string;
  teamMembers: { email: string; role: ProjectRole }[];
  createdAt: string;
}

export interface ApiDocument {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  upload_date: string;
  status: DocumentStatus;
}

export interface ApiUserStory {
  id: string;
  title: string;
  description: string | null;
  status: UserStoryStatus;
  priority: UserStoryPriority;
  createdAt: string;
  updatedAt: string;
  totalComments: number;
  comments: {
    id: string;
    content: string;
    createdAt: string;
  }[];
}

export interface ApiRequirement {
  id: string;
  title: string;
  description: string;
  type: RequirementType;
  status: RequirementStatus;
  projectId: string;
  createdAt: string;
}

// --- Frontend UI Models ---
// These are optimized for the React components and consumption

export interface Project {
  id: string;
  status: ProjectStatus;
  title: string;
  description: string;
  clientName?: string;
  teamMembers?: { email: string; role: ProjectRole }[];
  userName: string; // We'll derive this or keep for compatibility
  progress?: number;
  featuresCount: number;
  unsolvedComments: number;
  createdAt?: string;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  uploadDate: string;
  status: DocumentStatus;
}

export interface UserStory {
  id: string;
  status: UserStoryStatus;
  role: string;
  action: string;
  benefit: string;
  priority: UserStoryPriority;
  qualityScore: number;
  createdAt?: string;
  comments?: any[];
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  type: RequirementType;
  status: RequirementStatus;
  createdAt: string;
}

// --- UI Utilities ---

export interface TabConfig {
  value: string;
  label: string;
  icon: any; // Keep generic to avoid ReactNode issues if not imported
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
