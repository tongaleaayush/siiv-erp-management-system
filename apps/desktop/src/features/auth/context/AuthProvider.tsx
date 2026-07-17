import { useMemo, useState, type ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import { authService } from "../services/authService";
import type {
  AuthState,
  LoginCredentials,
} from "../types/auth.types";

interface AuthProviderProps {
  children: ReactNode;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState(initialState);

  const login = async (credentials: LoginCredentials) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const user = await authService.login(credentials);

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));

      throw error;
    }
  };

  const logout = () => {
    authService.logout();

    setAuthState(initialState);
  };

  const value = useMemo(
    () => ({
      ...authState,
      login,
      logout,
    }),
    [authState]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;