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

// --- Data Models (Synchronized with Backend API) ---
// We use these models directly in both API services and UI components.

export interface Project {
  id: string;
  name: string; // Backend: 'name'
  description: string;
  status: ProjectStatus;
  clientEmail: string;
  projectType: string;
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

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  upload_date: string; // Backend: 'upload_date'
  status: DocumentStatus;
}

export interface UserStory {
  id: string;
  title: string; // Backend: 'title'
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
  // UI-only derivation (Optional)
  qualityScore?: number;
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

// --- UI Utilities ---

export interface TabConfig {
  value: string;
  label: string;
  icon: any; 
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
