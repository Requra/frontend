import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { paths } from "./paths";
import { Spinner } from "@/components/ui/Spinner/spinner";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  // Wait for Zustand to rehydrate persisted state from localStorage
  // before making an auth decision — prevents flash-redirect to login.
  if (!hasHydrated) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to={paths.auth.login} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
