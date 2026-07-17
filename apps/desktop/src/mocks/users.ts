import type { User } from "@/features/auth/types/auth.types";

export interface MockUser extends User {
  password: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "1",
    username: "superadmin",
    password: "super123",
    role: "SUPER_ADMIN",
    isActive: true,
  },
  {
    id: "2",
    username: "admin",
    password: "admin123",
    role: "ADMIN",
    isActive: true,
  },
];