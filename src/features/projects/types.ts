import type { ProjectStatus } from "./components/ProjectCard/types";

export interface Project {
  id: string;
  status: ProjectStatus;
  title: string;
  description: string;
  progress?: number;
  featuresCount: number;
  unsolvedComments: number;
  userName: string;
}
