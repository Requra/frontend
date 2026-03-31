import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { resetPasswordSchema, type ResetPasswordCredentials } from "../schemas/resetPasswordSchema";

export interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordCredentials) => void;
  isLoading: boolean;
}

export const ResetPasswordForm = ({ onSubmit, isLoading }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordCredentials>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="New Password"
        type="password"
        placeholder="••••••••••••"
        autoFocus
        {...register("password")}
        error={errors.password?.message}
        endIcon={<EyeIcon className="text-neutral-500" />}
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••••••"
        {...register("confirm_password")}
        error={errors.confirm_password?.message}
        endIcon={<EyeIcon className="text-neutral-500" />}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="gradient"
          size="default"
          isLoading={isLoading}
        >
          <span className="relative z-10">
            {isLoading ? "Resetting..." : "Reset Password"}
          </span>
        </Button>
      </div>
    </form>
  );
};
