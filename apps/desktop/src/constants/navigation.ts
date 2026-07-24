import {
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    name: "Products",
    path: "/products",
    icon: Package,
  },
  {
  name: "Inventory",
  path: "/inventory",
  icon: Boxes,
},
  {
    name: "Invoices",
    path: "/invoices",
    icon: FileText,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];