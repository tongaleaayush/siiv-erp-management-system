import { mockUsers } from "@/mocks/users";

import type { LoginCredentials, User } from "../types/auth.types";

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const user = mockUsers.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const loggedInUser: User = {
  id: user.id,
  username: user.username,
  role: user.role,
  isActive: user.isActive,
};

return loggedInUser;
    return loggedInUser;
  },

  async logout(): Promise<void> {
    return;
  },
};