"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/components/providers/AuthProvider";
import { Project } from "@/types/project";
import { resetProject } from "@/lib/project";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/useToast";

interface ResetConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

export function ResetConfirmModal({
  open,
  onOpenChange,
  project,
}: ResetConfirmModalProps) {
  const router = useRouter();

  const handleConfirm = async () => {
    if (project.editCount === 0) {
      toast({
        title: "Reset failed",
        description: "You ran out of edit credits. Please upgrade to reset.",
        variant: "destructive",
      });
      return;
    } else {
      toast({
        title: "Resetting...",
      });
      resetProject()
        .then(() => router.replace("/"))
        .catch((error) => {
          console.error("Reset project error:", error);
          toast({
            title: "Reset failed",
            description: "Please try again",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset Website?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reset? This will use one of your edits.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
