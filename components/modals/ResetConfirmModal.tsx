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

interface ResetConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResetConfirmModal({
  open,
  onOpenChange,
}: ResetConfirmModalProps) {
  const { user, decrementEdits } = useAuth();

  const handleConfirm = () => {
    if (user?.editsRemaining === 0) return;
    decrementEdits();
    // Add reset logic here
    onOpenChange(false);
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
