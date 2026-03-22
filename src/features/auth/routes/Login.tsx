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
            <p className="text-neutral-500 mt-3 text-body-lg">
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
                <label
                  htmlFor="remember-me"
                  className="text-sm text-neutral-600"
                >
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-100" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-neutral-600">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              {/* Google */}
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-[42px]"
              >
                <svg
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Google"
                  className="size-5"
                >
                  <path
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                    fill="#4285F4"
                  />
                  <path
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                    fill="#34A853"
                  />
                  <path
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                    fill="#EA4335"
                  />
                </svg>
              </Button>

              {/* GitHub */}
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-[42px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="GitHub"
                  className="size-5"
                  fill="#181717"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </Button>

              {/* Facebook */}
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-[42px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Facebook"
                  className="size-5"
                  fill="#1877F2"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default LoginPage;
