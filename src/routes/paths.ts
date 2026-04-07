export const paths = {
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
  },
  app: {
    dashboard: "/app/dashboard",
    projects: {
      root: "/app/projects",
      upload: "/app/projects/:projectId/upload",
      uploadByProject: (id: string) => `/app/projects/${id}/upload`,
      detailsRoute: "/app/projects/:projectId",
      details: (id: string) => `/app/projects/${id}`,
      editRoute: "/app/projects/:projectId/edit",
      edit: (id: string) => `/app/projects/${id}/edit`,
    },
    newProject: "/app/new-project",
    profile: "/app/profile",
  },
} as const;
