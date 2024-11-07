"use client";

import { createContext, useContext, useState } from "react";
import { User, AuthResponse } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasUploadedResume: boolean;
  setHasUploadedResume: (value: boolean) => void;
  decrementEdits: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hasUploadedResume, setHasUploadedResume] = useState(false);

  const login = async (email: string, password: string) => {
    try {
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

      setUser(data.user);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const data: AuthResponse = await response.json();
      console.log("Registration data:", response);
      setUser(data.user);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Call logout endpoint
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear local state
      setUser(null);
      setHasUploadedResume(false);

      // Remove token from localStorage
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if API call fails
      setUser(null);
      setHasUploadedResume(false);
      localStorage.removeItem("token");
    }
  };

  const decrementEdits = async () => {
    if (user?.editsRemaining && user.editsRemaining > 0) {
      setUser({
        ...user,
        editsRemaining: user.editsRemaining - 1,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        hasUploadedResume,
        setHasUploadedResume,
        decrementEdits,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
