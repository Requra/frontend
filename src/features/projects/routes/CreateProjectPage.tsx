import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import React from "react";

import { Stepper } from "@/components/ui/Stepper/Stepper";
import { ProjectDetailsForm } from "../components/ProjectDetailsForm";
import { createProjectApi } from "../api/createProject";
import { paths } from "@/routes/paths";
import type { CreateProjectFormData } from "../schemas/createProjectSchema";

const steps = [
  { title: "Project Details" },
  { title: "Add Sources" },
  { title: "AI Generate" },
];

export const CreateProjectPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: CreateProjectFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createProjectApi(data);
      toast.success(`Project "${result.projectName}" created successfully!`);
      navigate(paths.app.dashboard);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-8 border border-neutral-200 rounded-lg bg-white shadow-sm my-8 h-fit">
      {/* Stepper */}
      <div className="w-full max-w-[712px] mb-8">
        <Stepper
          steps={steps}
          activeStep={0}
          orientation="horizontal"
          size="lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-page-title font-bold text-neutral-900 mb-2">
        Create New Project
      </h1>
      <p className="text-body-lg text-neutral-500 mb-10">
        Set up your project details before adding sources
      </p>

      {/* Form */}
      <ProjectDetailsForm
        onSubmit={handleSubmit}
        onCancel={() => navigate(paths.app.dashboard)}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
