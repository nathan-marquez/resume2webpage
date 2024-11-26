"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "./providers/AuthProvider";
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
import { ComingSoonModal } from "@/components/modals/ComingSoonModal";
import { AuthMode } from "@/types/auth";
import { useRouter } from "next/navigation";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const { user, logout, login } = useAuth();
  const { toast } = useToast();

  // const handleEditorClick = (e: React.MouseEvent) => {
  //   if (!user?.resumeUploaded) {
  //     e.preventDefault();
  //     toast({
  //       title: "Upload Required",
  //       description: "Please upload your resume first.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout successful",
        description: "See you soon!",
      });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "Please try again",
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
          <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 outline">
            Beta
          </span>
        </Link>

        {/* <NavigationMenu>
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
                    // onClick={handleEditorClick}
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
        </NavigationMenu> */}

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
              <Button variant="ghost" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => login()}>Log in with Google</Button>
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
