import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { EyeIcon, MailIcon } from "lucide-react";
import { loginSchema, type LoginCredentials } from "../schemas/loginSchema";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { Checkbox } from "@/components/ui/Checkbox/checkbox"; 
import { paths } from "@/routes/paths";
import BrandsButtons from "./BrandsButtons";

export interface LoginFormProps {
  onSubmit: (data: LoginCredentials) => void;
  isLoading: boolean;
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <Input
        label="Work Email"
        type="email"
        placeholder="jane@company.com"
        autoFocus
        {...register("email")}
        error={errors.email?.message}
        startIcon={<MailIcon className="text-neutral-500" />}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        {...register("password")}
        error={errors.password?.message}
        endIcon={<EyeIcon className="text-neutral-500" />}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember-me" defaultChecked={true} />
          <label htmlFor="remember-me" className="text-sm text-neutral-600">
            Keep me signed in
          </label>
        </div>
        <Link
          to={paths.auth.forgotPassword}
          className="text-sm text-primary-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="default"
        isLoading={isLoading}
      >
        <span className="relative z-10 w-full flex justify-center items-center">
          {isLoading ? "Signing in..." : "Sign In"}
        </span>
      </Button>

      <div className="text-center text-sm text-neutral-600">
        New to Requra?{" "}
        <Link
          to={paths.auth.register}
          className="text-primary-600 font-semibold hover:underline"
        >
          Create an account
        </Link>
      </div>

      <BrandsButtons />
    </form>
  );
};
