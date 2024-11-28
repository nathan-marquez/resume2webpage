"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUp, File, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/hooks/useToast";

import { AuthMode } from "@/types/auth";
import { uploadResume } from "@/lib/resume";

export function UploadZone() {
  const router = useRouter();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user, login } = useAuth(); //TODO: Remove setHasUploadedResume

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      // TODO: Add proper error handling/notification
      console.error("Please upload a PDF file");
      return;
    }

    try {
      setIsUploading(true);

      if (!user) {
        login()
          .then(async () => {
            if (user) {
              await uploadResume(file);
              router.push("/editor");
            } else {
              toast({
                title: "Login failed",
                description: "Please try again",
                variant: "destructive",
              });
            }
          })
          .catch(console.error);
      } else {
        router.push("/editor");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      // TODO: Add proper error handling/notification
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  return (
    <>
      {/* {user && (
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-muted-foreground">
            Edits remaining: {user.editsRemaining}/{user.totalEdits}
          </p>
        </div>
      )} */}
      <div
        className={cn(
          "relative rounded-lg border-2 border-dashed p-12 text-center",
          isDragging
            ? "border-primary bg-primary/15"
            : "border-muted-foreground/25 bg-primary/10"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="space-y-4">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Uploading your resume...</p>
              <Progress value={progress} className="w-[60%] mx-auto" />
            </div>
          </div>
        ) : (
          <>
            <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">
              Drag and drop your resume
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Support for PDF files up to 10MB
            </p>
            <label htmlFor="file-upload">
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Select File
              </Button>
            </label>
          </>
        )}
      </div>
    </>
  );
}
