import { Clock, CheckCircle2, FileText } from "lucide-react";
import type { Project, TabConfig } from "./types";
import { ProjectStatus, ProjectRole } from "./types/enums";

export const STEPPER_STEPS = [
  { title: "Project Details" },
  { title: "Add Sources" },
  { title: "AI Generate" },
] as const;

export const ALLOWED_EXTENSIONS = ["pdf", "docx", "txt", "mp3", "mp4"];

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    status: ProjectStatus.InProgress,
    name: "CRM System Requirements",
    description: "Requirements extracted from sales stakeholder meeting.",
    progress: 30,
    featuresCount: 18,
    unsolvedComments: 3,
    clientName: "Hassan Abdelhamed",
    teamMembers: [{ email: "hassan@example.com", role: ProjectRole.Owner }],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    status: ProjectStatus.InProgress,
    name: "E-commerce Platform API",
    description: "Backend infrastructure for the new shopping experience.",
    progress: 65,
    featuresCount: 24,
    unsolvedComments: 5,
    clientName: "Hassan Abdelhamed",
    teamMembers: [{ email: "hassan@example.com", role: ProjectRole.Owner }],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    status: ProjectStatus.InProgress,
    name: "Mobile App Wireframes",
    description: "User flow and high-fidelity mockups for iOS app.",
    progress: 15,
    featuresCount: 12,
    unsolvedComments: 2,
    clientName: "Hassan Abdelhamed",
    teamMembers: [{ email: "hassan@example.com", role: ProjectRole.Owner }],
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    status: ProjectStatus.Completed,
    name: "Inventory Management",
    description: "Finalized requirements for warehouse automation.",
    featuresCount: 42,
    unsolvedComments: 0,
    clientName: "Hassan Abdelhamed",
    teamMembers: [{ email: "hassan@example.com", role: ProjectRole.Owner }],
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    status: ProjectStatus.Completed,
    name: "Payment Gateway Integration",
    description: "Documentation for Stripe and PayPal integrations.",
    featuresCount: 15,
    unsolvedComments: 0,
    clientName: "Hassan Abdelhamed",
    teamMembers: [{ email: "hassan@example.com", role: ProjectRole.Owner }],
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    status: ProjectStatus.Completed,
    name: "Analytics Dashboard",
    description: "Initial thoughts on data visualization requirements.",
    featuresCount: 8,
    unsolvedComments: 1,
    clientName: "Hassan Abdelhamed",
    teamMembers: [{ email: "hassan@example.com", role: ProjectRole.Owner }],
    createdAt: new Date().toISOString(),
  },
];

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
];
