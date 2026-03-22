import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegister } from "../api/useRegister";
import { registerSchema, type RegisterCredentials } from "../types";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { paths } from "@/routes/paths";
import { EyeIcon, MailIcon, UserIcon } from "lucide-react";
import BrandsButtons from "../components/BrandsButtons";

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
      },
    });
  };

  return (
    <div className="w-full px-8 lg:px-[80px] mt-20">
      <div className="max-w-[480px] mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl leading-tight tracking-tight font-bold text-gradient-primary">
            Create your Requra.ai account
          </h1>
          <p className="text-neutral-500 mt-3 text-body-md">
            Start generating requirements from meetings and documents using AI.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            placeholder="John Doe"
            {...register("full_name")}
            error={errors.full_name?.message}
            startIcon={<UserIcon className="text-neutral-500" />}
          />

          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            error={errors.email?.message}
            startIcon={<MailIcon className="text-neutral-500" />}
          />

          <div className="flex gap-5 items-start justify-between">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
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
            variant="default"
            size="default"
            className="relative w-full overflow-hidden bg-gradient-steps text-white before:absolute before:inset-0 before:bg-gradient-steps-hover before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
            isLoading={registerMutation.isPending}
          >
            <span className="relative z-10 w-full flex justify-center items-center">
              {registerMutation.isPending ? "Creating account..." : "Sign Up"}
            </span>
          </Button>

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
      </div>
    </div>
  );
};

export default RegisterPage;
