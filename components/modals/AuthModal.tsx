"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/hooks/useToast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthMode } from "@/types/auth";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  redirectToEditor?: boolean;
}

export function AuthModal({
  open,
  onOpenChange,
  authMode,
  setAuthMode,
  redirectToEditor,
}: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === AuthMode.LOGIN) {
        await login(email, password);
      } else {
        await register(email, password);
      }

      toast({
        title: `${
          authMode === AuthMode.LOGIN ? "Login" : "Registration"
        } successful`,
        description: "Welcome to Resume2Webpage!",
      });

      onOpenChange(false);
      if (redirectToEditor) {
        router.push("/editor");
      }
    } catch (error) {
      toast({
        title: `${
          authMode === AuthMode.LOGIN ? "Login" : "Registration"
        } failed`,
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {authMode === AuthMode.LOGIN ? "Log in" : "Sign up"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Loading..."
              : authMode === AuthMode.LOGIN
              ? "Log in"
              : "Sign up"}
          </Button>
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() =>
                setAuthMode(
                  authMode === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN
                )
              }
              className="text-primary hover:underline"
            >
              {authMode === AuthMode.LOGIN
                ? "Need an account? Sign up"
                : "Already have an account? Log in"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
