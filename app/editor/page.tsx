"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { getProject } from "@/lib/project";
import { useRouter } from "next/navigation";
import Loading from "@/app/editor/loading";
import { Toolbar } from "@/components/editor/Toolbar";
import { useAuth } from "@/components/providers/AuthProvider";

export default function EditorPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (user) {
        let project = await getProject();
        if (project) {
          if (
            project.deletingFlag ||
            project.editingFlag ||
            project.uploadingFlag
          ) {
            // if the project is uploading,deleting or editing flag, wait for 5 seconds and poll
            setTimeout(fetchProject, 5000);
          } else if (project.cssFile && project.jsFile && project.htmlFile) {
            // if the project has all the files, set the project
            setProject(project);
          } else {
            // if the project is not uploading, deleting or editing and does not have all the files
            // this means the project has been deleted, so redirect to home so user can upload again
            router.push("/");
          }
        } else {
          // If project is null, redirect to home since user
          // has not uploaded a resume/initiated a project
          router.push("/");
        }
      } else {
        // If user is not logged in, redirect to home
        router.push("/");
      }
    };
    fetchProject();
  }, [user]);

  return (
    <div className="bg-grid-pattern">
      <div className="mx-auto container h-[calc(100vh-4rem)] relative">
        {project ? (
          <>
            <Toolbar project={project} setProject={setProject} />
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>
    </div>
  );
}
