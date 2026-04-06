import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogin } from "../api/useLogin";
import { type LoginCredentials } from "../schemas/loginSchema";
import { paths } from "@/routes/paths";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onSubmit = (data: LoginCredentials) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.isSuccess && res.data?.token) {
          toast.success(res.message || "Login successful!");
          navigate(paths.app.dashboard);
        } else {
          // API returned 200 but isSuccess is false (e.g. invalid credentials)
          toast.error(res.message || "Login failed");
        }
      },
    });
  };

  return (
    <div className="w-full px-8 lg:px-[80px]">
      <div className="max-w-[480px] mx-auto">
        <div className="mb-8">
          <h1 className="text-display leading-tight tracking-tight font-bold text-gradient-primary">
            Welcome back to Requra.ai
          </h1>
          <p className="text-neutral-500 mt-3 text-body-md">
            Sign in to access your automated requirements workspace.
          </p>
        </div>

        <LoginForm onSubmit={onSubmit} isLoading={loginMutation.isPending} />
      </div>
    </div>
  );
};

export default LoginPage;
