import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/server/firebase/firebaseAdmin";
import { getUser } from "@/server/lib/auth";
import { Project } from "@/types/project";

export async function GET(req: NextRequest) {
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

    // 2. Return the project data
    const project: Project = projectDoc.data() as Project;
    console.log("project", project);
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 }
    );
  }
}
