import { authRoutes, publicAuthRoutes } from "@/features/auth/routes/index";
import { dashboardRoutes } from "@/features/dashboard/routes/index";
import { projectsRoutes } from "@/features/projects/routes/index";
import { landingRoutes } from "@/features/landing/routes/index";
import { profileRoutes } from "@/features/profile/routes/index";
import { miscellaneousRoutes } from "@/features/misc/routes/index";
import type { AppRoute } from "@/types/routes";

// Aggregate all routes for metadata extraction and routing
export const allRoutes: AppRoute[] = [
  ...authRoutes,
  ...dashboardRoutes,
  ...projectsRoutes,
  ...landingRoutes,
  ...profileRoutes,
  ...miscellaneousRoutes,
  ...publicAuthRoutes,
];

// Extract sidebar routes for dynamic navigation
export const sidebarRoutes = allRoutes
  .filter((route) => route.sidebar)
  .sort((a, b) => {
    // Sort by group first, then by order
    const groupOrder = { main: 1, secondary: 2, user: 3 };
    const groupA = groupOrder[a.sidebar?.group || "main"];
    const groupB = groupOrder[b.sidebar?.group || "main"];

    if (groupA !== groupB) return groupA - groupB;
    return (a.sidebar?.order || 0) - (b.sidebar?.order || 0);
  });
