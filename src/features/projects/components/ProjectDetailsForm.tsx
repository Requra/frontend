import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { ArrowRight, Save } from "lucide-react";

import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Select } from "@/components/ui/Select/Select";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import { TagInput } from "@/components/ui/Input/TagInput";

import {
  createProjectSchema,
  type CreateProjectFormData,
  projectTypes,
  statusOptions,
  isValidEmail,
} from "../schemas/createProjectSchema";

interface ProjectDetailsFormProps {
  initialData?: CreateProjectFormData;
  onSubmit: (data: CreateProjectFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const ProjectDetailsForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProjectDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createProjectSchema) as any,
    defaultValues: initialData || {
      projectName: "",
      clientName: "",
      projectType: "",
      description: "",
      teamMembers: [],
    },
  });

  // Sync form with initialData when it changes (e.g., after fetching)
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const isEdit = !!initialData;

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

      {/* Project Type & Status */}
      <div className={cn("grid gap-6", isEdit ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
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

        {isEdit && (
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                label="Project Status"
                placeholder="Select Status"
                options={[...statusOptions]}
                error={errors.status?.message}
                {...field}
              />
            )}
          />
        )}
      </div>

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
            {isEdit ? (
              <>
                Save Changes
                <Save className="h-4 w-4" />
              </>
            ) : (
              <>
                Continue to Upload
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </span>
        </Button>
      </div>
    </form>
  );
};
