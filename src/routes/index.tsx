import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { paths } from "./paths";

// Feature Routes
import { LandingPage } from "@/features/landing";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "@/features/auth";
import { NotFound, ErrorPage } from "@/features/misc";

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: paths.home,
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
        ],
      },
      {
        // Auth routes
        element: <AuthLayout />,
        children: [
          {
            path: paths.auth.login,
            element: <LoginPage />,
          },
          {
            path: paths.auth.register,
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: paths.auth.forgotPassword,
        element: <ForgotPasswordPage />,
      },
      {
        path: paths.app.root,
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: paths.app.dashboard,
            element: <div className="p-8">Protected Dashboard Area</div>,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
