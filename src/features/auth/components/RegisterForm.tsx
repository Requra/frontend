import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { EyeIcon, MailIcon, UserIcon } from "lucide-react";
import { registerSchema, type RegisterCredentials } from "../schemas/registerSchema";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { paths } from "@/routes/paths";
import BrandsButtons from "./BrandsButtons";

export interface RegisterFormProps {
  onSubmit: (data: RegisterCredentials) => void;
  isLoading: boolean;
}

export const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="flex gap-5 items-start justify-between">
        <Input
          label="Create a Password"
          type="password"
          placeholder="At least 8 chars"
          {...register("password")}
          error={errors.password?.message}
          className="flex-1 w-full"
          endIcon={<EyeIcon className="text-neutral-500" />}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          {...register("confirm_password")}
          error={errors.confirm_password?.message}
          className="flex-1 w-full"
          endIcon={<EyeIcon className="text-neutral-500" />}
        />
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="default"
        isLoading={isLoading}
      >
        <span className="relative z-10 w-full flex justify-center items-center">
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
