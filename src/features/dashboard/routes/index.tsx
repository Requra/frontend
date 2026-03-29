import React from "react";
import type { AppRoute } from "@/types/routes";
import { BarChart2, User } from "lucide-react";
import { paths } from "@/routes/paths";

const DashboardPage = React.lazy(() =>
  import("./DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const ProfilePage = React.lazy(() =>
  import("./ProfilePage").then((m) => ({ default: m.ProfilePage })),
);

export const dashboardRoutes: AppRoute[] = [
  {
    path: paths.app.dashboard,
    element: <DashboardPage />,
    label: "Dashboard",
    sidebar: {
      icon: <BarChart2 size={24} />,
      order: 1,
      group: "main",
    },
  },
  {
    path: paths.app.profile,
    element: <ProfilePage />,
    label: "Profile",
    sidebar: {
      icon: <User size={24} />,
      order: 1,
      group: "user",
    },
  },
];
