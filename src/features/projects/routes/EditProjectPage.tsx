import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Layout } from "lucide-react";

import { ProjectDetailsForm } from "../components/ProjectDetailsForm";
import { getProjectByIdApi } from "../api/getProjects";
import { editProjectApi } from "../api/editProject";
import { paths } from "@/routes/paths";
import type { CreateProjectFormData } from "../schemas/createProjectSchema";

export const EditProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectByIdApi(projectId!),
    enabled: !!projectId,
  });

  const updateMutation = useMutation({
    mutationFn: (data: CreateProjectFormData) => editProjectApi(projectId!, data),
    onSuccess: () => {
      toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      navigate(paths.app.projects.details(projectId!));
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update project");
    },
  });

  const handleCancel = () => {
    navigate(paths.app.projects.details(projectId!));
  };

  const handleSubmit = (data: CreateProjectFormData) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-neutral-500 font-medium">Loading project details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center">
        <div className="p-4 bg-danger-50 rounded-full">
          <Layout className="w-10 h-10 text-danger-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Project Not Found</h2>
          <p className="text-neutral-500 mt-2">
            The project you're trying to edit doesn't exist or you don't have access.
          </p>
        </div>
        <button
          onClick={() => navigate(paths.app.projects.root)}
          className="text-primary-600 font-semibold hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Map API project to form data
  const initialData: CreateProjectFormData = {
    projectName: project.name,
    clientName: project.clientName,
    projectType: (project as any).projectType || "web",
    status: project.status ,
    description: project.description || "",
    teamMembers: project.teamMembers?.map((m: any) => m.email) || [],
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 px-8">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-neutral-600 transition-colors w-fit group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Project
        </button>
        
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
            Edit Project
          </h1>
          <p className="text-neutral-500 font-medium">
            Update your project details and team access
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-neutral-200/60 shadow-xl shadow-neutral-200/20 overflow-hidden py-8">
        <ProjectDetailsForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={updateMutation.isPending}
        />
      </div>
    </div>
  );
};
