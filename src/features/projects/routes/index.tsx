import React from "react";
import type { AppRoute } from "@/types/routes";
import { Folder, Plus } from "lucide-react";
import { paths } from "@/routes/paths";

const AllProjectsPage = React.lazy(() =>
  import("./AllProjectsPage").then((m) => ({ default: m.AllProjectsPage })),
);
const CreateProjectPage = React.lazy(() =>
  import("./CreateProjectPage").then((m) => ({ default: m.CreateProjectPage })),
);
const AddSourcesPage = React.lazy(() =>
  import("./AddSourcesPage").then((m) => ({ default: m.AddSourcesPage })),
);

export const projectsRoutes: AppRoute[] = [
  {
    path: paths.app.projects.root,
    element: <AllProjectsPage />,
    label: "Projects",
    sidebar: {
      icon: <Folder size={24} />,
      order: 2,
      group: "main",
    },
  },
  {
    path: paths.app.newProject,
    element: <CreateProjectPage />,
    label: "New Project",
    sidebar: {
      icon: <Plus size={24} />,
      order: 3,
      group: "main",
    },
  },
  {
    path: paths.app.projects.upload,
    element: <AddSourcesPage />,
  },
];
