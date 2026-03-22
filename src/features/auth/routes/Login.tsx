import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogin } from "../api/useLogin";
import { loginSchema, type LoginCredentials } from "../types";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { paths } from "@/routes/paths";

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
      }
    });
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-xl mt-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Welcome back</h1>
        <p className="text-neutral-500 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email"
          type="email"
          placeholder="admin@requra.ai"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          className="w-full h-12 text-lg rounded-xl"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing in..." : "Sign In"}
        </Button>

        <div className="text-center text-sm text-neutral-600">
          Don't have an account?{" "}
          <Link
            to={paths.auth.register}
            className="text-primary-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;