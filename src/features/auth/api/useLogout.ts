import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "./auth";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

export const useLogout = () => {
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      logout();
      toast.success("Logged out successfully");
    },
    onError: (error) => {
      console.error("Backend logout failed:", error);
      logout();
      toast.error("Session ended with errors on the server.");
    },
  });
};
