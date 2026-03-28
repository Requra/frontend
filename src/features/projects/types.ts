import type { ReactNode } from "react";
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

export interface TabConfig {
  value: string;
  label: string;
  icon: ReactNode;
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
