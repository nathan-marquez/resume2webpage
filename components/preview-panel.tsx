"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Code2, Download } from "lucide-react";

export function PreviewPanel() {
  const [mode, setMode] = useState<"preview" | "code">("preview");

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex space-x-2">
          <Button
            variant={mode === "preview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("preview")}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button
            variant={mode === "code" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("code")}
          >
            <Code2 className="mr-2 h-4 w-4" />
            Code
          </Button>
        </div>
        <Button size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        {mode === "preview" ? (
          <iframe
            src="about:blank"
            className="h-full w-full border-0"
            title="Website Preview"
          />
        ) : (
          <pre className="p-4">
            <code className="text-sm">
              {`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>John Doe - Portfolio</title>
</head>
<body>
    <h1>John Doe</h1>
    <p>Full Stack Developer</p>
    <!-- Generated code will appear here -->
</body>
</html>`}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}