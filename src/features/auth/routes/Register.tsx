import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegister } from "../api/useRegister";
import { useConfirmAccount } from "../api/useConfirmAccount";
import { useResendOtp } from "../api/useResendOtp";
import { type RegisterCredentials } from "../schemas/registerSchema";
import { type VerifyCodeCredentials } from "../schemas/verifyCodeSchema";
import { paths } from "@/routes/paths";
import { RegisterForm } from "../components/RegisterForm";
import { VerifyCodeForm } from "../components/VerifyCodeForm";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [registeredEmail, setRegisteredEmail] = useState("");
  
  const registerMutation = useRegister();
  const confirmMutation = useConfirmAccount();
  const resendOtpMutation = useResendOtp();

  const handleResendCode = () => {
    if (registeredEmail) {
      resendOtpMutation.mutate({ email: registeredEmail, otpType: 0 });
    }
  };

  const onRegisterSubmit = (data: RegisterCredentials) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Account created successfully! Please verify your email.");
        setRegisteredEmail(data.email);
        setStep(2);
      },
    });
  };

  const onVerifySubmit = (data: VerifyCodeCredentials) => {
    if (!registeredEmail) {
      toast.error("Missing email address for confirmation.");
      return;
    }
    
    confirmMutation.mutate(
      { email: registeredEmail, otpCode: data.code },
      {
        onSuccess: () => {
          toast.success("Account Confirmed Successfully! Please log in.");
          navigate(paths.auth.login);
        },
      }
    );
  };

  return (
    <div className="w-full px-8 lg:px-[80px] mt-20 pb-10">
      <div className="max-w-[480px] mx-auto">
        <div className="mb-8">
          {step === 1 ? (
            <>
              <h1 className="text-4xl leading-tight tracking-tight font-bold text-gradient-primary">
                Automate your requirement extraction
              </h1>
              <p className="text-neutral-500 mt-3 text-body-md">
                Convert meetings and docs into structured user stories, criteria, and artifacts instantly.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl leading-tight tracking-tight font-bold text-gradient-primary">
                Verify Your Email
              </h1>
              <p className="text-neutral-500 mt-3 text-body-md">
                We've sent a 6-digit confirmation code to <span className="font-semibold text-neutral-800">{registeredEmail}</span>.
              </p>
            </>
          )}
        </div>

        {step === 1 ? (
          <RegisterForm onSubmit={onRegisterSubmit} isLoading={registerMutation.isPending} />
        ) : (
          <VerifyCodeForm 
            onSubmit={onVerifySubmit} 
            isLoading={confirmMutation.isPending} 
            onResendCode={handleResendCode}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
