import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ProtectedRoute } from "./ProtectedRoute";

// Feature Routes
import { LandingPage } from "@/features/landing";
import { LoginPage, RegisterPage } from "@/features/auth";

import { paths } from "./paths";

export const router = createBrowserRouter([
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
]);
