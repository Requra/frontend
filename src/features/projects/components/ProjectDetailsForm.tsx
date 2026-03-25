import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Select } from "@/components/ui/Select/Select";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import { TagInput } from "@/components/ui/Input/TagInput";

import {
  createProjectSchema,
  type CreateProjectFormData,
  projectTypes,
  isValidEmail,
} from "../schemas/createProjectSchema";

interface ProjectDetailsFormProps {
  onSubmit: (data: CreateProjectFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const ProjectDetailsForm = ({
  onSubmit,
  onCancel,
  isSubmitting,
}: ProjectDetailsFormProps) => {
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6 px-8"
    >
      {/* Project Name + Client Name */}
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

      {/* Project Type */}
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

      {/* Description */}
      <Textarea
        label="Description"
        placeholder="What is this project about? Goals, users, constraints..."
        error={errors.description?.message}
        {...register("description")}
      />

      {/* Team Members */}
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

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
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
  );
};
