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
  },
  project: {
    root: "/projects",
    create: "/projects/create",
    upload: "/projects/upload",
  },
} as const;
