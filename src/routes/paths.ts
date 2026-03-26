export const paths = {
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
  },
  app: {
    root: "/app",
    dashboard: "/app/dashboard",
    projects: "/app/projects",
    profile: "/app/profile",
  },
} as const;
