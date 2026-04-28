import React from "react";
import type { AppRoute } from "@/types/routes";
import { User } from "lucide-react";
import { paths } from "@/routes/paths";

const ProfilePage = React.lazy(() =>
  import("./ProfilePage").then((m) => ({ default: m.ProfilePage })),
);

export const profileRoutes: AppRoute[] = [
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
