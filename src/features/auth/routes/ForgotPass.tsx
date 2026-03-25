import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";
import { AuthHeader } from "@/layouts/components/AuthHeader";
import forgotImg from "@/assets/images/Auth/Forgot.png";

import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { VerifyCodeForm } from "../components/VerifyCodeForm";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { ResetSuccess } from "../components/ResetSuccess";
import {
  type ForgotPasswordCredentials,
  type VerifyCodeCredentials,
  type ResetPasswordCredentials,
} from "../types";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isLoading, setIsLoading] = useState(false);

  const onEmailSubmit = (_data: ForgotPasswordCredentials) => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(2);
      setIsLoading(false);
    }, 1000);
  };

  const onCodeSubmit = (_data: VerifyCodeCredentials) => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(3);
      setIsLoading(false);
    }, 1000);
  };

  const onResetSubmit = (_data: ResetPasswordCredentials) => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(4);
      setIsLoading(false);
    }, 1000);
  };

  // STEP 1: SPLIT SCREEN LAYOUT
  if (step === 1) {
    return (
      <div className="relative min-h-screen w-full flex flex-col bg-white">
        <AuthHeader />
        <div className="flex-1 w-full flex flex-col lg:flex-row">
          {/* Image Side (Purple on LEFT) */}
          <div className="hidden lg:flex relative w-1/2 flex-col bg-primary-50/30 overflow-hidden">
            <div className="flex-1 flex items-center justify-center relative mt-20 lg:mt-0">
              <div className="absolute w-[500px] h-[500px] bg-primary-400/20 blur-[120px] rounded-full" />
              <img
                src={forgotImg}
                className="relative z-10 w-[520px] animate-float"
                alt="forgot password"
              />
            </div>
          </div>

          {/* Form Side (White on RIGHT) */}
          <div className="w-full lg:w-1/2 flex flex-col relative bg-white">
            <div className="flex-1 flex flex-col justify-center mt-20 lg:mt-0 px-8 lg:px-[80px]">
              <div className="max-w-[480px] mx-auto w-full">
                <div className="text-center mb-8">
                  <h1 className="text-[2.5rem] leading-tight tracking-tight font-bold text-gradient-primary">
                    Forgot Your Password?
                  </h1>
                  <p className="text-neutral-500 mt-3 text-body-md">
                    Enter your email and we'll send you a verification code to
                    reset your password.
                  </p>
                </div>

                <ForgotPasswordForm onSubmit={onEmailSubmit} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEPS 2, 3, 4: CENTERED CARD LAYOUT
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-white">
      <AuthHeader />

      <div className="flex-1 flex items-center justify-center p-8 mt-20 lg:mt-0">
        <div className="max-w-[600px] w-full bg-white border border-neutral-200/60 shadow-xl shadow-primary-900/5 rounded-3xl p-8 lg:p-12 text-center">
          {step === 2 && (
            <>
              <h1 className="text-3xl lg:text-4xl font-bold text-gradient-primary mb-3">
                Check Your Email
              </h1>
              <p className="text-neutral-500 text-[15px] mb-8 leading-relaxed px-4">
                We sent a verification code to your email. Enter the code below
                to continue.
              </p>
              <VerifyCodeForm onSubmit={onCodeSubmit} isLoading={isLoading} />
            </>
          )}

          {step === 3 && (
            <div className="text-left">
              <h1 className="text-3xl lg:text-4xl font-bold text-gradient-primary mb-8 text-center">
                Create a new password
              </h1>
              <ResetPasswordForm onSubmit={onResetSubmit} isLoading={isLoading} />
            </div>
          )}

          {step === 4 && (
            <ResetSuccess onNavigateLogin={() => navigate(paths.auth.login)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
