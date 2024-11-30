import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/server/firebase/firebaseAdmin";
import { getUser } from "@/server/lib/auth";

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

    try {
      // 2. Set the deleting flag and delete the files
      await projectDocRef.update({
        htmlFile: null,
        pdfFile: null,
        cssFile: null,
        deletingFlag: true,
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
