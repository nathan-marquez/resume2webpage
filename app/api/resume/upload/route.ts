import { NextRequest, NextResponse } from "next/server";
// import { verify } from "firebase-admin/auth"; // Ensure you have firebase-admin set up

export async function POST(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1]; // Extract token from the header

  if (!token) {
    return NextResponse.json(
      { error: "Authorization token missing or malformed" },
      { status: 401 }
    );
  }

  try {
    // const decodedToken = await verify(token); // Verify the token
    // const resumeFile = req.body.resume; // Access the uploaded file

    // Mock upload process (replace with actual upload logic to Firebase)
    // console.log("Resume uploaded for user:", decodedToken.uid);
    console.log("Resume uploaded");

    return NextResponse.json(
      { message: "Resume uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
