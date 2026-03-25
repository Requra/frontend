import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import React from "react";

import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Select } from "@/components/ui/Select/Select";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import { TagInput } from "@/components/ui/Input/TagInput";
import { Stepper } from "@/components/ui/Stepper/Stepper";

import {
  createProjectSchema,
  type CreateProjectFormData,
  projectTypes,
  isValidEmail,
} from "../schemas/createProjectSchema";
import { createProjectApi } from "../api/createProject";
import { paths } from "@/routes/paths";

const steps = [
  { title: "Project Details" },
  { title: "Add Sources" },
  { title: "AI Generate" },
];

export const CreateProject = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createProjectSchema) as any,
    defaultValues: {
      projectName: "",
      clientName: "",
      projectType: "",
      description: "",
      teamMembers: [],
    },
  });

  const onSubmit = async (data: CreateProjectFormData) => {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6 px-8"
      >
        {/* Row 1: Project Name + Client Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Project Name"
            placeholder="Ecommerce Platform"
            error={errors.projectName?.message}
            {...register("projectName")}
          />
          <Input
            label="Client / Stakeholder Name"
            placeholder="VOIS"
            error={errors.clientName?.message}
            {...register("clientName")}
          />
        </div>

        {/* Row 2: Project Type */}
        <Controller
          name="projectType"
          control={control}
          render={({ field }) => (
            <Select
              label="Project Type"
              placeholder="Select Type"
              options={[...projectTypes]}
              error={errors.projectType?.message}
              {...field}
            />
          )}
        />

        {/* Row 3: Description */}
        <Textarea
          label="Description"
          placeholder="What is this project about? Goals, users, constraints..."
          error={errors.description?.message}
          {...register("description")}
        />

        {/* Row 4: Team Members */}
        <Controller
          name="teamMembers"
          control={control}
          render={({ field }) => (
            <TagInput
              label="Team Members"
              placeholder="Invite teammates to review and export"
              value={field.value || []}
              onChange={field.onChange}
              validate={isValidEmail}
              error={errors.teamMembers?.message}
            />
          )}
        />

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(paths.app.dashboard)}
          >
            Back to Dashboard
          </Button>
          <Button
            type="submit"
            variant="gradient"
            isLoading={isSubmitting}
            className="w-auto! px-6"
          >
            <span className="relative z-10 flex items-center gap-2">
              Continue to Upload
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};
