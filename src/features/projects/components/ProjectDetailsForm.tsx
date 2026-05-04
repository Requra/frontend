import { useEffect } from "react";
import { useForm, Controller, type UseFormSetError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { ArrowRight, Save } from "lucide-react";

import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Select } from "@/components/ui/Select/Select";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import { TagInput } from "@/components/ui/Input/TagInput";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { CreditCard, Activity, GraduationCap, Info, Settings2, Users2 } from "lucide-react";

const typeIcons: Record<number, any> = {
  1: <CreditCard size={18} />,
  2: <Activity size={18} />,
  4: <GraduationCap size={18} />,
};

import {
  createProjectSchema,
  type CreateProjectFormData,
  projectTypes,
  statusOptions,
  isValidEmail,
} from "../schemas/createProjectSchema";

interface ProjectDetailsFormProps {
  initialData?: CreateProjectFormData;
  onSubmit: (data: CreateProjectFormData, setError: UseFormSetError<CreateProjectFormData>) => Promise<void>;
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
    setError,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createProjectSchema) as any,
    defaultValues: initialData || {
      projectName: "",
      clientEmail: "",
      projectType: [],
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

  const handleFormSubmit = async (data: CreateProjectFormData) => {
    try {
      await onSubmit(data, setError);
    } catch (error: any) {
      // Handle specific backend errors (e.g., 404 Client does not exist)
      if (error.statusCode === 404 && error.message?.includes("Client")) {
        setError("clientEmail", {
          type: "manual",
          message: "Client does not exist. Please verify the email or register the client."
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full flex flex-col gap-6 px-8"
    >
      {/* Section 1: Core Information */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
          <Info className="w-4 h-4 text-primary-500" />
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Core Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Project Name"
            placeholder="Ecommerce Platform"
            error={errors.projectName?.message}
            {...register("projectName")}
          />
          <Input
            label="Client Email"
            placeholder="client@example.com"
            type="email"
            error={errors.clientEmail?.message}
            {...register("clientEmail")}
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
      </div>

      {/* Section 2: Classification */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
          <Settings2 className="w-4 h-4 text-primary-500" />
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Classification</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-neutral-900">
              Project Type <span className="text-danger-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {projectTypes.map((type) => (
                <Controller
                  key={type.value}
                  name="projectType"
                  control={control}
                  render={({ field }) => {
                    const isSelected = field.value?.includes(type.value);
                    return (
                      <label
                        htmlFor={`type-${type.value}`}
                        className={cn(
                          "relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer group",
                          isSelected
                            ? "border-primary-500 bg-primary-50/30 shadow-sm ring-1 ring-primary-500/10"
                            : "border-neutral-200 bg-white hover:border-primary-200 hover:bg-neutral-50/30"
                        )}
                      >
                        <Checkbox
                          id={`type-${type.value}`}
                          checked={isSelected}
                          className="scale-90"
                          onCheckedChange={(checked) => {
                            const currentValues = field.value || [];
                            if (checked) {
                              field.onChange([...currentValues, type.value]);
                            } else {
                              field.onChange(currentValues.filter((v) => v !== type.value));
                            }
                          }}
                        />
                        <div className="flex items-center gap-1.5">
                          <span className={cn(
                            "transition-colors",
                            isSelected ? "text-primary-600" : "text-neutral-400 group-hover:text-primary-400"
                          )}>
                            {typeIcons[type.value]}
                          </span>
                          <span className={cn(
                            "text-xs font-bold transition-colors",
                            isSelected ? "text-primary-900" : "text-neutral-600"
                          )}>
                            {type.label}
                          </span>
                        </div>
                      </label>
                    );
                  }}
                />
              ))}
            </div>
            {errors.projectType && (
              <p className="text-xs text-danger-500">{errors.projectType.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Detailed Content */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
          <Users2 className="w-4 h-4 text-primary-500" />
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Collaboration & Scope</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {/* Description */}
          <Textarea
            label="Project Description"
            placeholder="What is this project about? Goals, users, constraints..."
            error={errors.description?.message}
            className="min-h-[120px]"
            {...register("description")}
          />

          {/* Team Members */}
          <Controller
            name="teamMembers"
            control={control}
            render={({ field }) => (
              <TagInput
                label="Team Members"
                placeholder="Invite teammates by email"
                value={field.value || []}
                onChange={field.onChange}
                validate={isValidEmail}
                error={errors.teamMembers?.message}
              />
            )}
          />
        </div>
      </div>

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
