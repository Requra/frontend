import { Clock, CheckCircle2, FileText } from "lucide-react";
import type { Project, TabConfig } from "./types";

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
    status: "IN PROGRESS",
    title: "CRM System Requirements",
    description: "Requirements extracted from sales stakeholder meeting.",
    progress: 30,
    featuresCount: 18,
    unsolvedComments: 3,
    userName: "Hassan Abdelhamed",
  },
  {
    id: "2",
    status: "IN PROGRESS",
    title: "E-commerce Platform API",
    description: "Backend infrastructure for the new shopping experience.",
    progress: 65,
    featuresCount: 24,
    unsolvedComments: 5,
    userName: "Hassan Abdelhamed",
  },
  {
    id: "3",
    status: "IN PROGRESS",
    title: "Mobile App Wireframes",
    description: "User flow and high-fidelity mockups for iOS app.",
    progress: 15,
    featuresCount: 12,
    unsolvedComments: 2,
    userName: "Hassan Abdelhamed",
  },
  {
    id: "4",
    status: "FINISHED",
    title: "Inventory Management",
    description: "Finalized requirements for warehouse automation.",
    featuresCount: 42,
    unsolvedComments: 0,
    userName: "Hassan Abdelhamed",
  },
  {
    id: "5",
    status: "FINISHED",
    title: "Payment Gateway Integration",
    description: "Documentation for Stripe and PayPal integrations.",
    featuresCount: 15,
    unsolvedComments: 0,
    userName: "Hassan Abdelhamed",
  },
  {
    id: "6",
    status: "FINISHED",
    title: "Analytics Dashboard",
    description: "Initial thoughts on data visualization requirements.",
    featuresCount: 8,
    unsolvedComments: 1,
    userName: "Hassan Abdelhamed",
  },
];

export const TABS_CONFIG: TabConfig[] = [
  {
    value: "processing",
    label: "Processing",
    icon: <Clock size={16} />,
    status: "IN PROGRESS",
    emptyMessage: "No processing projects",
  },
  {
    value: "completed",
    label: "Completed",
    icon: <CheckCircle2 size={16} />,
    status: "FINISHED",
    emptyMessage: "No completed projects",
  },
  {
    value: "draft",
    label: "Draft",
    icon: <FileText size={16} />,
    status: "DRAFT",
    emptyMessage: "No drafts found",
  },
];
