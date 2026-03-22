import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "@/routes/paths";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/Input/input-otp";
import { MailIcon, EyeIcon } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/ui/Logo/Logo";
import forgotImg from "@/assets/images/Auth/Forgot.png";
import successImg from "@/assets/images/Success.png";
import {
  forgotPasswordSchema,
  verifyCodeSchema,
  resetPasswordSchema,
  type ForgotPasswordCredentials,
  type VerifyCodeCredentials,
  type ResetPasswordCredentials,
} from "../types";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "FAQ'S", href: "#faqs" },
  { name: "Contact", href: "#contact" },
];

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1 Form
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<ForgotPasswordCredentials>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Step 2 Form
  const {
    control: controlCode,
    handleSubmit: handleCodeSubmit,
    formState: { errors: codeErrors },
  } = useForm<VerifyCodeCredentials>({
    resolver: zodResolver(verifyCodeSchema),
  });

  // Step 3 Form
  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm<ResetPasswordCredentials>({
    resolver: zodResolver(resetPasswordSchema),
  });

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

  const Navbar = () => (
    <header className="absolute top-0 left-0 w-full h-20 px-8 lg:px-[80px] flex items-center justify-between z-50 pointer-events-none">
      <Link to="/" className="pointer-events-auto">
        <Logo />
      </Link>
      <nav className="hidden lg:flex items-center gap-10 pointer-events-auto">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-neutral-500 hover:text-primary-600 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </nav>
    </header>
  );

  // STEP 1: SPLIT SCREEN LAYOUT
  if (step === 1) {
    return (
      <div className="relative min-h-screen w-full flex flex-col bg-white">
        <Navbar />
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

                <form
                  onSubmit={handleEmailSubmit(onEmailSubmit)}
                  className="space-y-6"
                >
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="hassan@gmail.com"
                    autoFocus
                    {...registerEmail("email")}
                    error={emailErrors.email?.message}
                    startIcon={<MailIcon className="text-neutral-500" />}
                  />
                  <Button
                    type="submit"
                    variant="gradient"
                    size="default"
                    isLoading={isLoading}
                  >
                    <span className="relative z-10 w-full flex justify-center items-center">
                      {isLoading ? "Sending..." : "Send Code"}
                    </span>
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
      <Navbar />

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

              <form
                onSubmit={handleCodeSubmit(onCodeSubmit)}
                className="space-y-8"
              >
                <div className="flex flex-col items-center justify-center w-full">
                  <Controller
                    control={controlCode}
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
                  {codeErrors.code?.message && (
                    <p className="text-[0.8rem] font-medium text-danger-500 mt-2">
                      {codeErrors.code.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="default"
                  isLoading={isLoading}
                >
                  <span className="relative z-10 w-full flex justify-center items-center">
                    {isLoading ? "Verifying..." : "Verify Code"}
                  </span>
                </Button>

                <div className="text-sm text-neutral-600">
                  Didn't receive the email?{" "}
                  <button
                    type="button"
                    className="text-primary-600 font-bold hover:underline"
                    onClick={() => toast.success("Reset link resent!")}
                  >
                    resend the reset link.
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <div className="text-left">
              <h1 className="text-3xl lg:text-4xl font-bold text-gradient-primary mb-8 text-center">
                Create a new password
              </h1>

              <form
                onSubmit={handleResetSubmit(onResetSubmit)}
                className="space-y-6"
              >
                <Input
                  label="New Password"
                  type="password"
                  placeholder="••••••••••••"
                  autoFocus
                  {...registerReset("password")}
                  error={resetErrors.password?.message}
                  endIcon={<EyeIcon className="text-neutral-500" />}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••••••"
                  {...registerReset("confirm_password")}
                  error={resetErrors.confirm_password?.message}
                  endIcon={<EyeIcon className="text-neutral-500" />}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="gradient"
                    size="default"
                    isLoading={isLoading}
                  >
                    <span className="relative z-10 w-full flex justify-center items-center">
                      {isLoading ? "Resetting..." : "Reset Password"}
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          )}

          {step === 4 && (
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
                onClick={() => navigate(paths.auth.login)}
                variant="gradient"
                size="default"
              >
                <span className="relative z-10 w-full flex justify-center items-center">
                  Back to Sign In
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
