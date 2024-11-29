import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth"; // Ensure Firebase Admin SDK is initialized

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1] || null;

  if (!token) {
    return NextResponse.json(
      { error: "Authorization token missing or malformed" },
      { status: 401 }
    );
  }

  try {
    // Verify the token with Firebase Admin SDK
    const decodedToken = await getAuth().verifyIdToken(token);

    // Mock user retrieval (replace with actual database/service call if needed)
    const user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    // Add user to custom header for downstream handlers
    req.headers.set("x-user", JSON.stringify(user));

    // Allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json(
      { error: "Unauthorized or invalid token" },
      { status: 403 }
    );
  }
}

// Middleware matcher to apply to specific routes
export const config = {
  matcher: ["/api/:path*"], // Apply middleware to all API routes
};
