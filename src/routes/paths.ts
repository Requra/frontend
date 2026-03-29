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
      upload: "/app/projects/upload",
    },
    newProject: "/app/new-project",
    profile: "/app/profile",
  },
} as const;
