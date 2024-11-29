//write function to get user from token in the request, then return the user
import { NextRequest } from "next/server";
import { auth } from "@/server/firebase/firebaseAdmin";

export const getUser = async (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return null;
  }
  const decodedToken = await auth.verifyIdToken(token);
  return {
    uid: decodedToken.uid,
    email: decodedToken.email,
  };
};
