// util/auth.ts
import { AuthResponse, User } from "@/types/auth";

// API client for authentication
export const auth = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Authentication failed");
    }

    return data;
  },

  register: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  logout: async (token: string | null): Promise<void> => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  },

  // Add other auth-related API calls here
  decrementEdits: async (userId: string): Promise<User> => {
    const response = await fetch(`/api/user/${userId}/decrement-edits`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to decrement edits");
    }

    return response.json();
  },
};
