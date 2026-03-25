import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import React from "react";

import { Stepper } from "@/components/ui/Stepper/Stepper";
import { ProjectDetailsForm } from "../components/ProjectDetailsForm";
import { createProjectApi } from "../api/createProject";
import { paths } from "@/routes/paths";
import type { CreateProjectFormData } from "../schemas/createProjectSchema";
import Title from "../components/Title";

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
      <Title
        title="Create New Project"
        description="Set up your project details before adding sources"
      />

      {/* Form */}
      <ProjectDetailsForm
        onSubmit={handleSubmit}
        onCancel={() => navigate(paths.app.dashboard)}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
