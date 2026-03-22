import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogin } from "../api/useLogin";
import { loginSchema, type LoginCredentials } from "../types";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { paths } from "@/routes/paths";
import { EyeIcon, MailIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import BrandsButtons from "../components/BrandsButtons";

export const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginCredentials) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.IsSuccess) {
          toast.success("Login successful!");
          navigate(paths.app.dashboard);
        } else {
          toast.error(res.Message || "Login failed");
        }
      },
      onError: (err) => {
        toast.error("An error occurred: " + err.message);
      },
    });
  };

  return (
    <div className="w-full px-8 lg:px-[80px]">
      <div className="max-w-[480px] mx-auto">
        <div className="mb-8">
          <h1 className="text-display leading-tight tracking-tight font-bold text-gradient-primary">
            Welcome Back to Requra.ai
          </h1>
          <p className="text-neutral-500 mt-3 text-body-md">
            Sign in to access your AI-powered requirements workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@requra.ai"
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
              <Checkbox id="remember-me" />
              <label htmlFor="remember-me" className="text-sm text-neutral-600">
                Remember me
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
            variant="default"
            size="default"
            className="relative w-full overflow-hidden bg-gradient-steps text-white before:absolute before:inset-0 before:bg-gradient-steps-hover before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
            isLoading={loginMutation.isPending}
          >
            <span className="relative z-10 w-full flex justify-center items-center">
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </span>
          </Button>

          <div className="text-center text-sm text-neutral-600">
            Don't have an account?{" "}
            <Link
              to={paths.auth.register}
              className="text-primary-600 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </div>

          <BrandsButtons />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
