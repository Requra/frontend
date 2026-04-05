import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button/Button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/Input/input-otp";
import { verifyCodeSchema, type VerifyCodeCredentials } from "../schemas/verifyCodeSchema";

export interface VerifyCodeFormProps {
  onSubmit: (data: VerifyCodeCredentials) => void;
  isLoading: boolean;
  onResendCode?: () => void;
}

export const VerifyCodeForm = ({ onSubmit, isLoading, onResendCode }: VerifyCodeFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeCredentials>({
    resolver: zodResolver(verifyCodeSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-col items-center justify-center w-full">
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <InputOTP maxLength={6} {...field} autoFocus>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.code?.message && (
          <p className="text-[0.8rem] font-medium text-danger-500 mt-2">
            {errors.code.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="default"
        isLoading={isLoading}
      >
        <span className="relative z-10">
          {isLoading ? "Verifying..." : "Verify Code"}
        </span>
      </Button>

      <div className="text-sm text-neutral-600 mt-2">
        Didn't receive the code?{" "}
        <Button
          type="button"
          variant="link"
          className="text-primary-600 font-bold hover:underline p-0 h-auto"
          onClick={() => onResendCode?.()}
        >
          Resend code.
        </Button>
      </div>
    </form>
  );
};
