import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegister } from "../api/useRegister";
import { registerSchema, type RegisterCredentials } from "../types";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { paths } from "@/routes/paths";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterCredentials) => {
    registerMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.IsSuccess) {
          toast.success("Account created successfully!");
          navigate(paths.app.dashboard);
        } else {
          toast.error(res.Message || "Registration failed");
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
        <h1 className="text-3xl font-bold text-neutral-900">Create an account</h1>
        <p className="text-neutral-500 mt-2">Start your 14-day free trial</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full Name"
          placeholder="John Doe"
          {...register("full_name")}
          error={errors.full_name?.message}
        />

        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
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

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          {...register("confirm_password")}
          error={errors.confirm_password?.message}
        />

        <Button
          type="submit"
          className="w-full h-12 text-lg rounded-xl mt-2"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Creating account..." : "Sign Up"}
        </Button>

        <div className="text-center text-sm text-neutral-600 pt-2">
          Already have an account?{" "}
          <Link
            to={paths.auth.login}
            className="text-primary-600 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;