"use client";

import { useState, useEffect } from "react";
import { ChatInterface } from "@/components/editor/ChatInterface";
import { PreviewPanel } from "@/components/editor/PreviewPanel";
import { Project } from "@/types/project";
import { getProject } from "@/lib/project";

export default function EditorPage() {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const project = getProject();
    if (project && project.cssFile && project.jsFile && project.htmlFile)
      setProject(project);
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] relative">
      {project ? (
        <>
          <PreviewPanel project={project} />
          <div className="absolute bottom-4 right-4 w-[400px]">
            <ChatInterface setProject={setProject} />
          </div>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
}
