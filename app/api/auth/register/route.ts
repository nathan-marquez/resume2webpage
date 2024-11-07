import { NextResponse } from "next/server";

const mockUsers: any[] = [];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if user exists
    if (mockUsers.some((u) => u.email === email)) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: String(mockUsers.length + 1),
      email,
      password, // In real implementation, this would be hashed
      editsRemaining: 5,
      totalEdits: 5,
    };

    mockUsers.push(newUser);

    return NextResponse.json({
      user: {
        email: newUser.email,
        editsRemaining: newUser.editsRemaining,
        totalEdits: newUser.totalEdits,
      },
      token: "mock_jwt_token",
    });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
