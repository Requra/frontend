import { Clock, CheckCircle2, FileText, XCircle } from "lucide-react";
import type { TabConfig } from "./types";
import { ProjectStatus } from "./types/enums";

export const STEPPER_STEPS = [
  { title: "Project Details" },
  { title: "Add Sources" },
  { title: "AI Generate" },
] as const;

export const ALLOWED_EXTENSIONS = ["pdf", "docx", "txt", "mp3", "mp4"];

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export const TABS_CONFIG: TabConfig[] = [
  {
    value: "processing",
    label: "Processing",
    icon: <Clock size={16} />,
    status: ProjectStatus.InProgress,
    emptyMessage: "No processing projects",
  },
  {
    value: "completed",
    label: "Completed",
    icon: <CheckCircle2 size={16} />,
    status: ProjectStatus.Completed,
    emptyMessage: "No completed projects",
  },
  {
    value: "draft",
    label: "Draft",
    icon: <FileText size={16} />,
    status: ProjectStatus.Drafted,
    emptyMessage: "No drafts found",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: <XCircle size={16} />,
    status: ProjectStatus.Cancelled,
    emptyMessage: "No cancelled projects",
  },
];
