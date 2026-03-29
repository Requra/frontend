import type { RouteObject } from "react-router-dom";
import type { ReactNode } from "react";

export interface RouteSidebarConfig {
  icon: ReactNode;
  order?: number;
  group?: "main" | "secondary" | "user";
}

export interface AppRoute extends Omit<RouteObject, "children"> {
  label?: string;
  sidebar?: RouteSidebarConfig;
  children?: AppRoute[];
}
