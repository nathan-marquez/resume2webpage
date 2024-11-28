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

  const [activeTab, setActiveTab] = useState("preview");
  const [activeFile, setActiveFile] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProject();
      if (project.htmlFile) setActiveFile(project.htmlFile);
    };
    fetchProject();
  }, [project]);

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
      <div className="flex justify-between border-b p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center bg-blue-100">
            <TabsList>
              <TabsTrigger value="preview">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code">
                <Code2 className="mr-2 h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>
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
          <TabsContent value="preview" className="mt-0">
            {activeFile && project ? (
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
          </TabsContent>
          <TabsContent value="code" className="mt-0">
            {activeFile && project ? (
              <div className="mt-4 flex h-[calc(100vh-16rem)] overflow-scroll">
                <div className="w-48 border-r">
                  <div className="p-2">
                    <button
                      key={"html"}
                      onClick={() => setActiveFile(project.htmlFile)}
                      className={`w-full text-left px-3 py-2 rounded text-sm ${
                        activeFile === "html"
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {"html"}
                    </button>
                    <button
                      key={"css"}
                      onClick={() => setActiveFile(project.cssFile)}
                      className={`w-full text-left px-3 py-2 rounded text-sm ${
                        activeFile === "css"
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {"css"}
                    </button>
                    <button
                      key={"js"}
                      onClick={() => setActiveFile(project.jsFile)}
                      className={`w-full text-left px-3 py-2 rounded text-sm ${
                        activeFile === "js"
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {"js"}
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-4 bg-gray-50">
                  <pre className="text-sm">
                    <code>{activeFile}</code>
                  </pre>
                </div>
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
      </div>
      <ResetConfirmModal
        open={showResetModal}
        onOpenChange={setShowResetModal}
        project={project}
      />
    </div>
  );
}
