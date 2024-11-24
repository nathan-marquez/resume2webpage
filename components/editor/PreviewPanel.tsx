"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Code2, Download, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResetConfirmModal } from "@/components/modals/ResetConfirmModal";
import { ProjectFile } from "@/types/project";
import { getProject } from "@/lib/project";

interface PreviewPanelProps {
  files: ProjectFile[] | null;
}

export function PreviewPanel({ files }: PreviewPanelProps) {
  const [showResetModal, setShowResetModal] = useState(false);

  const [activeTab, setActiveTab] = useState("preview");
  const [activeFile, setActiveFile] = useState<ProjectFile | null>(null);

  useEffect(() => {
    const files = getProject();
    if (files && files.length > 0) setActiveFile(files[0]);
  }, [files]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center">
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
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
          <TabsContent value="preview" className="mt-0">
            {activeFile && files ? (
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
                  srcDoc={`${files[0].content}<style>${files[1].content}</style><script>${files[2].content}</script>`}
                  className="w-full h-[calc(100vh-16rem)] border-0"
                  title="Website Preview"
                />
              </div>
            ) : null}
          </TabsContent>
          <TabsContent value="code" className="mt-0">
            {activeFile && files ? (
              <div className="mt-4 flex h-[calc(100vh-16rem)]">
                <div className="w-48 border-r">
                  <div className="p-2">
                    {files.map((file) => (
                      <button
                        key={file.name}
                        onClick={() => setActiveFile(file)}
                        className={`w-full text-left px-3 py-2 rounded text-sm ${
                          activeFile.name === file.name
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {file.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-4 bg-gray-50">
                  <pre className="text-sm">
                    <code>{activeFile.content}</code>
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
      />
    </div>
  );
}
