import React from "react";
import type { AppRoute } from "@/types/routes";
import { paths } from "@/routes/paths";

const LoginPage = React.lazy(() => import("./Login"));
const RegisterPage = React.lazy(() => import("./Register"));
const ForgotPasswordPage = React.lazy(() => import("./ForgotPass"));

export const authRoutes: AppRoute[] = [
  {
    path: paths.auth.login,
    element: <LoginPage />,
  },
  {
    path: paths.auth.register,
    element: <RegisterPage />,
  },
];

export const publicAuthRoutes: AppRoute[] = [
  {
    path: paths.auth.forgotPassword,
    element: <ForgotPasswordPage />,
  },
];
