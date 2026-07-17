import type { RouteObject } from "react-router-dom";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import MainLayout from "@/layouts/MainLayout";

export const protectedRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
];