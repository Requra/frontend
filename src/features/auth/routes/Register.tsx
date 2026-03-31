import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegister } from "../api/useRegister";
import { type RegisterCredentials } from "../schemas/registerSchema";
import { paths } from "@/routes/paths";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

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
    <div className="w-full px-8 lg:px-[80px] mt-20 pb-10">
      <div className="max-w-[480px] mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl leading-tight tracking-tight font-bold text-gradient-primary">
            Automate your requirement extraction
          </h1>
          <p className="text-neutral-500 mt-3 text-body-md">
            Convert meetings and docs into structured user stories, criteria, and artifacts instantly.
          </p>
        </div>

        <RegisterForm onSubmit={onSubmit} isLoading={registerMutation.isPending} />
      </div>
    </div>
  );
};

export default RegisterPage;
