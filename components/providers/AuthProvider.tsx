"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User, AuthResponse } from "@/types/auth";
import {
  logout as logoutApi,
  loginWithGoogle,
  onAuthStateChanged,
} from "@/lib/auth";
import { useToast } from "@/hooks/useToast";

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged((user: User | null) => {
      if (user) {
        setUser(user);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }
    });
  }, []);

  // Update the login method
  const login = async () => {
    try {
      const data: AuthResponse = await loginWithGoogle();
      setUser(data.user);
      localStorage.setItem("token", data.token);
      toast({
        title: "Login successful",
        description: "Welcome to Resume2Webpage!",
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message != "Firebase: Error (auth/popup-closed-by-user)."
      ) {
        console.error("Login error:", error, error.cause, error.message);
        console.error("error", error);
        console.error("error.cause", error.cause);
        console.error("error.message", error.message);
        console.error("error.name", error.name);

        toast({
          title: "Login failed",
          description:
            error instanceof Error ? error.message : "Please try again",
          variant: "destructive",
        });
        throw error;
      }
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
