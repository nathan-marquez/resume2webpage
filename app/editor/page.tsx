"use client";

import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { ChatInterface } from "@/components/chat-interface";
import { PreviewPanel } from "@/components/preview-panel";

export default function EditorPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={20}>
          <ChatInterface />
        </ResizablePanel>
        <ResizablePanel defaultSize={70} minSize={30}>
          <PreviewPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}