import { MoreVertical, Share2, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/DropdownMenu";
import type { ProjectStatus } from "./types";
import { STATUS_STYLES, STATUS_LABELS } from "./types";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectApi } from "../../api/deleteProject";
import { toast } from "sonner";
import { ConfirmationModal } from "../ConfirmationModal";

interface ProjectCardHeaderProps {
  status: ProjectStatus;
  projectId: string;
}

export function ProjectCardHeader({ status, projectId }: ProjectCardHeaderProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutate: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: deleteProjectApi,
    onMutate: async (id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["projects"] });

      // Snapshot the previous values
      const previousProjects = queryClient.getQueryData(["projects"]);

      // Optimistically update to the new value
      // This effectively "removes it from the list" immediately for the user
      queryClient.setQueriesData({ queryKey: ["projects"] }, (old: any) => {
        if (!old || !old.data) return old;
        return {
          ...old,
          data: old.data.filter((p: any) => p.id !== id),
          totalCount: Math.max(0, old.totalCount - 1),
        };
      });

      // Return a context object with the snapshotted value
      return { previousProjects };
    },
    onSuccess: () => {
      // Close the modal immediately on success
      setIsDeleteModalOpen(false);
      toast.success("Project deleted successfully");
    },
    onError: (error: any, __, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProjects) {
        queryClient.setQueriesData({ queryKey: ["projects"] }, context.previousProjects);
      }
      toast.error(error?.message || "Failed to delete project");
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we are in sync with the server
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });


  return (
    <div className="flex items-center justify-between">

      <span
        className={cn(
          "rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase",
          STATUS_STYLES[status],
        )}
      >
        {STATUS_LABELS[status]}
      </span>
      <div 
        className="flex items-center gap-1 opacity-40 transition-opacity group-hover:opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <Tooltip content="Quick Share" position="top">
          <Button
            variant="ghost-neutral"
            size="icon-sm"
            className="text-neutral-500"
          >
            <Share2 />
          </Button>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost-neutral"
              size="icon-sm"
              className="text-neutral-500 focus-visible:ring-0"
            >
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem 
              className="text-neutral-600"
              onClick={(e) => {
                e.stopPropagation();
                navigate(paths.app.projects.edit(projectId));
              }}
            >
              <Edit size={14} className="mr-2" />
              Edit project
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-neutral-600"
              onClick={(e) => e.stopPropagation()}
            >
              <Share2 size={14} className="mr-2" />
              Share link
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-danger-600 focus:bg-danger-50 focus:text-danger-700"
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteModalOpen(true);
              }}
            >
              <Trash2 size={14} className="mr-2" />
              Delete project
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteProject(projectId)}
        title="Delete Project?"
        description="Are you sure you want to delete this project? This action cannot be undone and all associated data will be permanently removed."
        confirmLabel="Delete Project"
        cancelLabel="Keep Project"
        variant="destructive"
        icon={Trash2}
        isLoading={isDeleting}
      />
    </div>
  );
}

