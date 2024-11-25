"use client";

import { useState, useEffect } from "react";
import { ChatInterface } from "@/components/editor/ChatInterface";
import { PreviewPanel } from "@/components/editor/PreviewPanel";
import { ProjectFile } from "@/types/project";
import { getProject } from "@/lib/project";

export default function EditorPage() {
  const [files, setFiles] = useState<ProjectFile[] | null>(null);

  useEffect(() => {
    const files = getProject();
    if (files && files.length > 0) setFiles(files);
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] relative">
      <PreviewPanel files={files} />
      <div className="absolute bottom-4 right-4 w-[400px]">
        <ChatInterface setFiles={setFiles} />
      </div>
    </div>
  );
}
