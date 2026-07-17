export type UserRole = "SUPER_ADMIN" | "ADMIN";

export interface User {
  id: string;
  username: string;
  role: UserRole;
  isActive: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}