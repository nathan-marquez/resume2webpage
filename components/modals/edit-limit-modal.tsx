"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface EditLimitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditLimitModal({ open, onOpenChange }: EditLimitModalProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push("/pricing");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Limit Reached</DialogTitle>
          <DialogDescription>
            You've reached your free edit limit. Upgrade to Premium for unlimited edits and additional features.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpgrade}>
            Upgrade to Premium
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}