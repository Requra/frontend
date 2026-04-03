import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { ErrorPage } from "@/features/misc/routes/ErrorPage";

import { sidebarRoutes } from "./config";
import { authRoutes, publicAuthRoutes } from "@/features/auth/routes/index";
import { dashboardRoutes } from "@/features/dashboard/routes/index";
import { projectsRoutes } from "@/features/projects/routes/index";
import { landingRoutes } from "@/features/landing/routes/index";
import { miscellaneousRoutes } from "@/features/misc/routes/index";
import type { AppRoute } from "@/types/routes";

// Export sidebarRoutes from here if components are still importing from index.tsx
export { sidebarRoutes };

// Helper to wrap elements in Suspense for lazy loading
const withSuspense = (routes: AppRoute[]): any[] => {
  return routes.map((route) => ({
    ...route,
    element: (
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        }
      >
        {route.element}
      </Suspense>
    ),
    children: route.children ? withSuspense(route.children) : undefined,
  }));
};

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainLayout />,
        children: withSuspense(landingRoutes),
      },
      {
        element: <AuthLayout />,
        children: withSuspense(authRoutes),
      },
      ...withSuspense(publicAuthRoutes),
      {
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: withSuspense([...dashboardRoutes, ...projectsRoutes]),
      },
      ...withSuspense(miscellaneousRoutes),
    ],
  },
]);
