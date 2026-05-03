import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { googleLogin } from "./auth";
import { useAuthStore } from "@/stores/auth";
import { handleApiError } from "@/utils/errorHelpers";
import { paths } from "@/routes/paths";

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: ({ idToken, platform }: { idToken: string; platform?: string }) =>
      googleLogin(idToken, platform),
    onSuccess: (response) => {
      if (response.data && response.data.token && response.data.refreshToken) {
        const { token, refreshToken, ...user } = response.data;
        setAuth(user as any, token, refreshToken);
        toast.success("Logged in successfully with Google!");
        navigate(paths.app.dashboard || "/");
      }
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
};
