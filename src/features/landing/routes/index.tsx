import React from "react";
import type { AppRoute } from "@/types/routes";
import { paths } from "@/routes/paths";

const LandingPage = React.lazy(() =>
  import("../LandingPage").then((m) => ({ default: m.LandingPage })),
);

export const landingRoutes: AppRoute[] = [
  {
    path: paths.home,
    element: <LandingPage />,
  },
];
