import { Button } from "@/components/ui/Button/Button";
import successImg from "@/assets/images/Success.png";

export interface ResetSuccessProps {
  onNavigateLogin: () => void;
}

export const ResetSuccess = ({ onNavigateLogin }: ResetSuccessProps) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gradient-primary mb-3">
        Password Reset Successfully
      </h1>
      <p className="text-neutral-500 text-[15px] mb-8 leading-relaxed">
        Your password has been updated. You can now sign in with your
        new password.
      </p>

      <img
        src={successImg}
        className="w-[250px] h-auto mb-8 animate-float object-contain"
        alt="Success robot"
      />

      <Button
        type="button"
        onClick={onNavigateLogin}
        variant="gradient"
        size="default"
      >
        <span className="relative z-10 w-full flex justify-center items-center">
          Back to Sign In
        </span>
      </Button>
    </div>
  );
};
