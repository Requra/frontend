import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { MailIcon } from "lucide-react";
import { paths } from "@/routes/paths";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import {
  forgotPasswordSchema,
  type ForgotPasswordCredentials,
} from "../schemas/forgotPasswordSchema";

export interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordCredentials) => void;
  isLoading: boolean;
}

export const ForgotPasswordForm = ({
  onSubmit,
  isLoading,
}: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordCredentials>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Email Address"
        type="email"
        placeholder="hassan@gmail.com"
        autoFocus
        {...register("email")}
        error={errors.email?.message}
        startIcon={<MailIcon className="text-neutral-500" />}
      />
      <Button
        type="submit"
        variant="gradient"
        size="default"
        isLoading={isLoading}
      >
        <span className="relative z-10">
          {isLoading ? "Sending..." : "Send Code"}
        </span>{" "}
      </Button>

      <div className="text-center text-sm text-neutral-600 mt-1">
        Remember your password?{" "}
        <Link
          to={paths.auth.login}
          className="text-primary-600 font-bold hover:underline"
        >
          Back to Sign In
        </Link>
      </div>
    </form>
  );
};
