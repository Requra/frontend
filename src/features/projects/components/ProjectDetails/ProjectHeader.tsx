import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import {
  Share2,
  CheckCircle,
  ArrowLeft,
  Clock,
  ChevronRight,
  Edit3,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/DropdownMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paths } from "@/routes/paths";
import { getProjectByIdApi } from "../../api/getProjects";
import { deleteProjectApi } from "../../api/deleteProject";
import { ProjectStatus } from "../../types/enums";
import { STATUS_STYLES, STATUS_LABELS } from "../ProjectCard/types";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmationModal } from "../ConfirmationModal";

export const ProjectHeader = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { projectId } = useParams<{ projectId: string }>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutate: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate(paths.app.projects.root);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete project");
    },
  });

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectByIdApi(projectId!),
    enabled: !!projectId,
    staleTime: 30_000,
  });

  const projectName = project?.name || "Loading...";
  const status = (project?.status ?? ProjectStatus.InProgress) as ProjectStatus;

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => navigate(paths.app.projects.root)}
          className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-700 transition-colors group font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Projects
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
        <span className="text-neutral-700 font-semibold truncate max-w-[200px]">
          {projectName}
        </span>
      </div>

      {/* Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
            {projectName}
          </h1>
          <div className="flex items-center gap-3">
            <Badge 
              variant={status === ProjectStatus.Completed ? "success" : "extracted"} 
              size="default"
              className={STATUS_STYLES[status]}
            >
              {status === ProjectStatus.Completed && <CheckCircle className="w-3 h-3 mr-1" />}
              {STATUS_LABELS[status]}
            </Badge>
            <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-400">
              <Clock className="w-3 h-3" />
              Updated recently
            </span>
          </div>
        </div>

        {/* Actions: Primary CTA + More dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Primary action */}
          <Button
            variant="default"
            className="h-10 px-5 rounded-xl bg-linear-to-b from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md shadow-primary-500/20 font-bold border-none transition-all text-sm"
          >
            <CheckCircle className="mr-2 h-3.5 w-3.5" />
            Finalize Report
          </Button>

          {/* More actions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm transition-all"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem
                className="text-neutral-600 cursor-pointer"
                onClick={() => navigate(paths.app.projects.edit(projectId!))}
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem className="text-neutral-600 cursor-pointer">
                <Share2 className="mr-2 h-4 w-4" />
                Share Project
              </DropdownMenuItem>
              <hr className="my-1 border-neutral-100" />
              <DropdownMenuItem
                className="text-danger-600 focus:bg-danger-50 focus:text-danger-700 cursor-pointer"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteProject(projectId!)}
        title="Delete Project?"
        description={`Are you sure you want to delete "${projectName}"? This action cannot be undone and all associated requirements and stories will be lost.`}
        confirmLabel="Delete Project"
        cancelLabel="Keep Project"
        variant="destructive"
        icon={Trash2}
        isLoading={isDeleting}
      />
    </div>
  );
};
