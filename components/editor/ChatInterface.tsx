"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/providers/AuthProvider";
import { EditLimitModal } from "@/components/modals/EditLimitModal";
import { Project } from "@/types/project";
import { editProject } from "@/lib/project";

interface ChatInterfaceProps {
  project: Project;
  setProject: (project: Project) => void;
}

export function ChatInterface({ project, setProject }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [showEditLimitModal, setShowEditLimitModal] = useState(false);
  const { user } = useAuth();

  const handleSendEdit = async () => {
    if (!input.trim()) return;

    if (project.editCount === 0) {
      setShowEditLimitModal(true);
      return;
    }
    editProject(input.trim())
      .then((newProject) => setProject(newProject))
      .catch(console.error);

    setInput("");
  };

  return (
    // <div className="bg-background/95 border rounded-lg shadow-lg m-2 outline outline-primary">
    <div className="p-4 space-y-4 w-full">
      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your customization request..."
          // className="min-h-[3em] w-full" // Updated to make it wider and limit height
          // style={{ height: "1em" }} // Set height to accommodate 2 lines
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendEdit();
            }
          }}
        />
        <div>
          <Button onClick={handleSendEdit} className="px-3">
            <Send className="h-4 w-4" />
          </Button>
          {/* <div className="text-xs text-muted-foreground">
            {user && (
              <p>
                {project.editCount}/{5} Edits
              </p>
            )}
          </div> */}
        </div>
      </div>
      {/* </div> */}
      <EditLimitModal
        open={showEditLimitModal}
        onOpenChange={setShowEditLimitModal}
      />
    </div>
  );
}
