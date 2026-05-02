import React from "react";
import type { AppRoute } from "@/types/routes";
import { BarChart2 } from "lucide-react";
import { paths } from "@/routes/paths";

const DashboardPage = React.lazy(() =>
  import("./DashboardPage").then((m) => ({ default: m.DashboardPage })),
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
];
