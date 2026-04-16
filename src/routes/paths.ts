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
      meetings: {
        root: "/app/projects/:projectId/meetings",
        detailsRoute: "/app/projects/:projectId/meetings/:meetingId",
        details: (projectId: string, meetingId: string) => `/app/projects/${projectId}/meetings/${meetingId}`,
        newRoute: "/app/projects/:projectId/meetings/new",
        new: (projectId: string) => `/app/projects/${projectId}/meetings/new`,
        liveRoute: "/app/projects/:projectId/meetings/live",
        live: (projectId: string) => `/app/projects/${projectId}/meetings/live`,
      },
    },
    newProject: "/app/new-project",
    profile: "/app/profile",
  },
} as const;
