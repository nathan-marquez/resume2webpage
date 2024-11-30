import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/server/firebase/firebaseAdmin";
import { getUser } from "@/server/lib/auth";
import { Project } from "@/types/project";
import { FieldValue } from "firebase-admin/firestore";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const user = await getUser(req);

  if (!user) {
    return NextResponse.json(
      { error: "Authorization token missing or unauthorized" },
      { status: 401 }
    );
  }

  try {
    // 1. Get the user project document reference
    const projectDocRef = firestore.collection("project").doc(user.uid);
    const projectDoc = await projectDocRef.get();

    if (!projectDoc.exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const project: Project = projectDoc.data() as Project;

    if (project.editingFlag || project.uploadingFlag || project.deletingFlag) {
      return NextResponse.json(
        { error: "Project is being edited, uploading, or deleting" },
        { status: 400 }
      );
    }
    if (project.editCount <= 0) {
      return NextResponse.json({ error: "Edit count is 0" }, { status: 400 });
    }

    try {
      // 2. Set the deleting flag and delete the files
      await projectDocRef.update({
        htmlFile: null,
        pdfFile: null,
        cssFile: null,
        deletingFlag: true,
        editCount: FieldValue.increment(-1),
      });

      await projectDocRef.update({
        deletingFlag: false,
      });

      // 3. Return success response
      return NextResponse.json(
        { message: "Project files deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      await projectDocRef.update({
        deletingFlag: false,
      });
      return NextResponse.json(
        {
          error: "Internal server error while deleting project files: " + error,
        },
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
