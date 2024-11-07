import { NextResponse } from "next/server";

// Mock database
const mockUsers = [
  {
    id: "1",
    email: "test@example.com",
    password: "password123",
    editsRemaining: 5,
    totalEdits: 5,
  },
];

export async function POST(request: Request) {
  console.log("🔵 Login route hit");

  // Ensure the request is a POST
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    // Safely parse JSON
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    console.log("📦 Request body:", body);

    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = mockUsers.find((u) => u.email === email);
    console.log("🔍 Found user:", user ? "Yes" : "No");

    if (!user || user.password !== password) {
      console.log("❌ Authentication failed: Invalid credentials");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const response = {
      user: {
        email: user.email,
        editsRemaining: user.editsRemaining,
        totalEdits: user.totalEdits,
      },
      token: "mock_jwt_token",
    };

    console.log("✅ Authentication successful:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("💥 Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
