import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { paths } from "./paths";

// Feature Routes
import { LandingPage } from "@/features/landing";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "@/features/auth";
import { NotFound, ErrorPage } from "@/features/misc";
import {
  CreateProjectPage,
  AddSourcesPage,
  AllProjectsPage,
} from "@/features/projects";

import { DashboardPage, ProfilePage } from "@/features/dashboard";
import { DashboardLayout } from "@/layouts/DashboardLayout";

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
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: paths.app.dashboard,
            element: <DashboardPage />,
          },
          {
            path: paths.project.root,
            element: <AllProjectsPage />,
          },
          {
            path: paths.app.profile,
            element: <ProfilePage />,
          },
          {
            path: paths.project.create,
            element: <CreateProjectPage />,
          },
          {
            path: paths.project.upload,
            element: <AddSourcesPage />,
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
