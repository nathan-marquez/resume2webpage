"use client";

import { createContext, useContext, useState } from "react";
import { User, AuthResponse } from "@/types/auth";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setHasUploadedResume: (value: boolean) => void; // TODO: This should be removed later
  decrementEdits: () => Promise<void>; // TODO: This should be removed later
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const data: AuthResponse = await loginApi(email, password);

      setUser(data.user);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const data: AuthResponse = await registerApi(email, password);

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
      await logoutApi(token);

      // Clear local state
      setUser(null);

      // Remove token from localStorage
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if API call fails
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  const setHasUploadedResume = (value: boolean) => {
    if (user) {
      setUser({ ...user, resumeUploaded: value });
    }
  };

  // This should be removed later
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
