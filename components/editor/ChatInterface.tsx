"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/providers/AuthProvider";
import { EditLimitModal } from "@/components/modals/EditLimitModal";
import { Project } from "@/types/project";

interface ChatInterfaceProps {
  setProject: (project: Project) => void;
}

export function ChatInterface({ setProject }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [showEditLimitModal, setShowEditLimitModal] = useState(false);
  const { user } = useAuth();

  const handleSend = () => {
    if (!input.trim()) return;

    // if (user?.editsRemaining === 0) {
    //   setShowEditLimitModal(true);
    //   return;
    // }

    // decrementEdits();
    // Handle the edit request here
    setInput("");
  };

  return (
    <div className="bg-background border rounded-lg shadow-lg">
      <div className="p-4 space-y-4">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your customization request..."
            className="min-h-[60px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend} className="px-3">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          {/* {user && (
            <p>
              Edits remaining: {user.editsRemaining}/{user.totalEdits}
            </p>
          )} */}
        </div>
      </div>
      <EditLimitModal
        open={showEditLimitModal}
        onOpenChange={setShowEditLimitModal}
      />
    </div>
  );
}
