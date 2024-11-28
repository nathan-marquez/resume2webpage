import { auth } from "@/app/firebase/firebaseConfig"; // Import Firebase auth
import { getAuth } from "firebase/auth";

export const uploadResume = async (file: File): Promise<void> => {
  const user = auth.currentUser; // Get the current user
  if (!user) {
    throw new Error("User is not authenticated");
  }

  const token = await user.getIdToken(); // Get the token

  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch("/api/resume/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload resume");
  }
};
