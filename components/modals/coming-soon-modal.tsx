"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ComingSoonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComingSoonModal({ open, onOpenChange }: ComingSoonModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feature Coming Soon</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>This feature is coming soon. Stay tuned!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
