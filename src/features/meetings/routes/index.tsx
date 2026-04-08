import type { AppRoute } from "@/types/routes";
import { LiveMeetingPage } from "./LiveMeetingPage";

export const meetingsRoutes: AppRoute[] = [
  {
    path: "live",
    element: <LiveMeetingPage />,
  },
  {
    path: ":meetingId",
    element: <LiveMeetingPage />,
  },
  {
    path: "new",
    element: <LiveMeetingPage />,
  },
];
