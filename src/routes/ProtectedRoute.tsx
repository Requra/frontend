import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { paths } from "./paths";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  
  // TODO: Replace this hardcoded boolean with your actual auth state API later
  // e.g., const { isAuthenticated } = useAuthStore() or useQuery(...)
  const isAuthenticated = false; // Change this to 'true' to see the dashboard
  
  if (!isAuthenticated) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to. This allows you to send them back to that page after login!
    return <Navigate to={paths.auth.login} state={{ from: location }} replace />;
  }

  // If authenticated, render the children
  return <>{children}</>;
};
