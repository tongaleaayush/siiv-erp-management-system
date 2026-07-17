import type { RouteObject } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";



export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
];
