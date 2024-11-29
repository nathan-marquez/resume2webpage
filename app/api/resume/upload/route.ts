import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/server/firebase/firebaseAdmin";
import { getUser } from "@/server/lib/auth";

export async function POST(req: NextRequest) {
  const user = await getUser(req);

  if (!user) {
    return NextResponse.json(
      { error: "Authorization token missing or unauthorized" },
      { status: 401 }
    );
  }

  try {
    // const decodedToken = await verify(token); // Verify the token
    // const resumeFile = req.body.resume; // Access the uploaded file

    // Mock upload process (replace with actual upload logic to Firebase)
    // console.log("Resume uploaded for user:", decodedToken.uid);
    console.log("Resume uploaded for user:", user.uid);

    return NextResponse.json(
      { message: "Resume uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error: " + error },
      { status: 500 }
    );
  }
}
