import React from "react";
import type { AppRoute } from "@/types/routes";

const NotFound = React.lazy(() =>
  import("./NotFound").then((m) => ({ default: m.NotFound })),
);

export const miscellaneousRoutes: AppRoute[] = [
  {
    path: "*",
    element: <NotFound />,
  },
];
