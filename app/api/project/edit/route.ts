import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/server/firebase/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { getUser } from "@/server/lib/auth";
import { Project } from "@/types/project";

export async function PATCH(req: NextRequest) {
  const user = await getUser(req);

  if (!user) {
    return NextResponse.json(
      { error: "Authorization token missing or unauthorized" },
      { status: 401 }
    );
  }

  try {
    // 1. Get the user project from Firestore
    const projectDocRef = firestore.collection("project").doc(user.uid);
    const projectDoc = await projectDocRef.get();

    if (!projectDoc.exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Assert that the project is not being edited, uploading, or deleting and that the edit count is greater than 0
    const project = projectDoc.data() as Project;
    if (project.editingFlag || project.uploadingFlag || project.deletingFlag) {
      return NextResponse.json(
        { error: "Project is being edited, uploading, or deleting" },
        { status: 400 }
      );
    }

    if (project.editCount <= 0) {
      return NextResponse.json({ error: "Edit count is 0" }, { status: 400 });
    }

    // 2. Set the updating flag and attempt to generate the files
    await projectDocRef.update({
      editingFlag: true,
    });
    try {
      // 3. Get the edit string prompt from the request body
      const formData = await req.formData();
      const editText = formData.get("editText") as string;

      // 4. Call LLM with the edit string prompt and the current files
      const { htmlFile, cssFile, jsFile } = project;
      if (!(htmlFile && cssFile && jsFile)) {
        return NextResponse.json(
          { error: "Project files are missing" },
          { status: 400 }
        );
      }
      const { updatedHtmlFile, updatedCssFile, updatedJsFile } =
        await generateFiles(editText, htmlFile, cssFile, jsFile);

      let newProject = project;

      newProject.htmlFile = updatedHtmlFile;
      newProject.cssFile = updatedCssFile;
      newProject.jsFile = updatedJsFile;
      newProject.editCount = newProject.editCount - 1;

      // 5. Update the project with the new data
      await projectDocRef.update({
        htmlFile: updatedHtmlFile,
        cssFile: updatedCssFile,
        jsFile: updatedJsFile,
        editingFlag: false,
        editCount: FieldValue.increment(-1), // Decrement edit count
      });

      // 6. Return the updated project data
      return NextResponse.json(newProject, { status: 200 });
    } catch (error) {
      await projectDocRef.update({
        editingFlag: false,
      });
      return NextResponse.json(
        { error: "Internal server error during file editing: " + error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 }
    );
  }
}

async function generateFiles(
  editText: string,
  htmlFile: string,
  cssFile: string,
  jsFile: string
): Promise<{
  updatedHtmlFile: string;
  updatedCssFile: string;
  updatedJsFile: string;
}> {
  return {
    updatedHtmlFile: "edited html",
    updatedCssFile: "edited css",
    updatedJsFile: "edited js",
  };
}
