"use client";

import { createContext, useContext, useState } from "react";
import { AuthMode } from "@/types/auth";
import { AuthModal } from "@/components/modals/AuthModal";

interface AuthModalContextType {
  showAuthModal: (mode: AuthMode, redirectToEditor?: boolean) => void;
  hideAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const showAuthModal = (mode: AuthMode, redirectToEditor: boolean = false) => {
    setMode(mode);
    setShouldRedirect(redirectToEditor);
    setIsOpen(true);
  };

  const hideAuthModal = () => {
    setIsOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ showAuthModal, hideAuthModal }}>
      {children}
      <AuthModal
        open={isOpen}
        onOpenChange={setIsOpen}
        authMode={mode}
        setAuthMode={setMode}
        redirectToEditor={shouldRedirect}
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}
