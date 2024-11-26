"use client";

import { createContext, useContext, useState } from "react";
import { User, AuthResponse } from "@/types/auth";
import {
  logout as logoutApi,
  loginWithGoogle,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Update the login method
  const login = async () => {
    try {
      const data: AuthResponse = await loginWithGoogle();
      setUser(data.user);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Call logout endpoint without token parameter
      await logoutApi();

      // Clear local state
      setUser(null); 
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
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
