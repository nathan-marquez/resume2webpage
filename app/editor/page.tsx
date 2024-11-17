"use client";

import { useState, useEffect } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ChatInterface } from "@/components/editor/ChatInterface";
import { PreviewPanel } from "@/components/editor/PreviewPanel";
import { ProjectFile } from "@/types/project";
import { getProjectFiles } from "@/lib/project";

export default function EditorPage() {
  const [files, setFiles] = useState<ProjectFile[] | null>(null);

  useEffect(() => {
    const files = getProjectFiles();
    if (files && files.length > 0) setFiles(files);
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
          <ChatInterface />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70} minSize={50}>
          <PreviewPanel files={files} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
