import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon, MailIcon, UserIcon } from "lucide-react";
import { useTogglePassword } from "@/hooks/useTogglePassword";
import { registerSchema, type RegisterCredentials } from "../schemas/registerSchema";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { paths } from "@/routes/paths";
import BrandsButtons from "./BrandsButtons";
import { Select } from "@/components/ui/Select/Select";
import { UserRole } from "../types/enums";

export interface RegisterFormProps {
  onSubmit: SubmitHandler<RegisterCredentials>;
  isLoading: boolean;
  serverError?: string | null;
}

export const RegisterForm = ({
  onSubmit,
  isLoading,
  serverError,
}: RegisterFormProps) => {
  const passwordToggle = useTogglePassword();
  const confirmPasswordToggle = useTogglePassword();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-3 rounded-lg bg-danger-50 border border-danger-200 text-danger-600 text-sm font-medium">
          {serverError}
        </div>
      )}
      <Input
        label="Full Name"
        placeholder="Jane Doe"
        autoFocus
        {...register("full_name")}
        error={errors.full_name?.message}
        startIcon={<UserIcon className="text-neutral-500" />}
      />

      <Input
        label="Work Email"
        type="email"
        placeholder="jane@company.com"
        {...register("email")}
        error={errors.email?.message}
        startIcon={<MailIcon className="text-neutral-500" />}
      />
      
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select
            label="Select Your Role"
            placeholder="Choose your role..."
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            error={errors.role?.message}
            options={[
              { value: UserRole.Stackholder, label: "Stakeholder" },
              { value: UserRole.BussinessAnalyst, label: "Business Analyst" },
              { value: UserRole.ProjectManager, label: "Project Manager" },
            ]}
          />
        )}
      />

      <div className="flex gap-5 items-start justify-between">
        <Input
          label="Create a Password"
          type={passwordToggle.inputType}
          placeholder="At least 8 chars"
          {...register("password")}
          error={errors.password?.message}
          className="flex-1 w-full"
          endIcon={
            <button
              type="button"
              onClick={passwordToggle.toggleVisibility}
              className="focus:outline-none hover:text-primary-500 transition-colors cursor-pointer"
            >
              {passwordToggle.isVisible ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          }
        />

        <Input
          label="Confirm Password"
          type={confirmPasswordToggle.inputType}
          placeholder="••••••••"
          {...register("confirm_password")}
          error={errors.confirm_password?.message}
          className="flex-1 w-full"
          endIcon={
            <button
              type="button"
              onClick={confirmPasswordToggle.toggleVisibility}
              className="focus:outline-none hover:text-primary-500 transition-colors"
            >
              {confirmPasswordToggle.isVisible ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          }
        />
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="default"
        isLoading={isLoading}
      >
        <span className="relative z-10">
          {isLoading ? "Creating account..." : "Create Account"}
        </span>
      </Button>

      <p className="text-xs text-center text-neutral-500 mt-2">
        By creating an account, you agree to our Terms of Service and Privacy Policy.
      </p>

      <div className="text-center text-sm text-neutral-600">
        Already have an account?{" "}
        <Link
          to={paths.auth.login}
          className="text-primary-600 font-semibold hover:underline"
        >
          Sign in
        </Link>
      </div>

      <BrandsButtons />
    </form>
  );
};
