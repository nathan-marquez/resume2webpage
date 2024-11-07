// util/auth.ts
import { AuthResponse, User } from "@/types/auth";

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
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
};

export const register = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
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
};

export const logout = async (token: string | null): Promise<void> => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
};
