"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/components/providers/modals/AuthModalProvider";
import { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  FileUp,
  Palette,
  CreditCard,
  HelpCircle,
  Edit3,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { ComingSoonModal } from "@/components/modals/coming-soon-modal";
import { AuthMode } from "@/types/auth";

export function Navigation() {
  const pathname = usePathname();
  const { showAuthModal } = useAuthModal();
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleEditorClick = (e: React.MouseEvent) => {
    if (!user?.resumeUploaded) {
      e.preventDefault();
      toast({
        title: "Upload Required",
        description: "Please upload your resume first.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-6xl mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <FileUp className="h-6 w-6" />
          <span className="font-bold">Resume2Webpage</span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/templates" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowComingSoonModal(true);
                  }}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Templates
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#pricing" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowComingSoonModal(true);
                  }}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {user && (
              <NavigationMenuItem>
                <Link href="/editor" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    onClick={handleEditorClick}
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Editor
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <Link href="/help" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowComingSoonModal(true);
                  }}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/#pricing">
                <Button
                  variant="outline"
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Premium
                </Button>
              </Link>
              <Button variant="ghost" onClick={logout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  showAuthModal(AuthMode.LOGIN);
                }}
              >
                Log in
              </Button>
              <Button
                onClick={() => {
                  showAuthModal(AuthMode.SIGNUP);
                }}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>

      <ComingSoonModal
        open={showComingSoonModal}
        onOpenChange={setShowComingSoonModal}
      />
    </header>
  );
}
