"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Code2, Download, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResetConfirmModal } from "@/components/modals/ResetConfirmModal";
import { Project } from "@/types/project";
import { getProject } from "@/lib/project";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { ChatInterface } from "@/components/editor/ChatInterface";

interface ToolbarProps {
  project: Project;
  setProject: (project: Project) => void;
}

export function Toolbar({ project, setProject }: ToolbarProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleDownload = () => {
    const projectFile = `${project.htmlFile}<style>${project.cssFile}</style><script>${project.jsFile}</script>`;
    const blob = new Blob([projectFile], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-col justify-between border-b">
        <div className="mt-0">
          {project ? (
            <div className="mt-4 border rounded-lg overflow-hidden bg-white">
              <div className="border-b px-4 py-2 bg-gray-50 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center text-sm text-gray-600">
                  preview.resume2webpage.com
                </div>
              </div>
              <iframe
                srcDoc={`${project.htmlFile}<style>${project.cssFile}</style><script>${project.jsFile}</script>`}
                className="w-full h-[calc(100vh-12rem)] border-0"
                title="Website Preview"
              />
            </div>
          ) : null}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm whitespace-nowrap">
              Edits left: {project.editCount}/5
            </span>
            <Button
              size="sm"
              className="ml-2"
              onClick={() => {
                /* Handle upgrade logic */
              }}
            >
              Upgrade
            </Button>
          </div>
          <ChatInterface project={project} setProject={setProject} />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => setShowResetModal(true)}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
      <ResetConfirmModal
        open={showResetModal}
        onOpenChange={setShowResetModal}
        project={project}
      />
    </div>
  );
}
