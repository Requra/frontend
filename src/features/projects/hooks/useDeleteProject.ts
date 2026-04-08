import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deleteProjectApi } from "../api/deleteProject";
import { paths } from "@/routes/paths";
import type { ProjectsQueryData } from "../types";

interface UseDeleteProjectOptions {
  /** If true, navigate to projects list on success (used in detail pages) */
  navigateOnSuccess?: boolean;
  /** Callback fired after successful deletion (e.g., closing a modal) */
  onSuccess?: () => void;
}

/**
 * Shared hook for deleting a project with optimistic update and rollback.
 * Used by both ProjectCardHeader (list view) and ProjectHeader (detail view).
 */
export function useDeleteProject(options: UseDeleteProjectOptions = {}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteProjectApi,

    onMutate: async (id: string) => {
      // Cancel outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["projects"] });

      // Snapshot current cache for rollback
      const previousProjects = queryClient.getQueryData(["projects"]);

      // Optimistically remove the project from the list
      queryClient.setQueriesData<ProjectsQueryData>(
        { queryKey: ["projects"] },
        (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.filter((p) => p.id !== id),
            totalCount: Math.max(0, old.totalCount - 1),
          };
        },
      );

      return { previousProjects };
    },

    onSuccess: () => {
      toast.success("Project deleted successfully");
      options.onSuccess?.();

      if (options.navigateOnSuccess) {
        navigate(paths.app.projects.root);
      }
    },

    onError: (error: Error, _id, context) => {
      // Rollback optimistic update on error
      if (context?.previousProjects) {
        queryClient.setQueriesData(
          { queryKey: ["projects"] },
          context.previousProjects,
        );
      }
      toast.error(error.message || "Failed to delete project");
    },

    onSettled: () => {
      // Always re-sync with server after mutation
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
