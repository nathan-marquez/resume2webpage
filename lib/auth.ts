import { AuthResponse, User } from "@/types/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged as onFirebaseAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseClient";

export const loginWithGoogle = async (): Promise<AuthResponse> => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || "";

    return {
      user: {
        email: result.user.email || "",
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const onAuthStateChanged = (
  callback: (user: User | null) => void
): void => {
  onFirebaseAuthStateChanged(auth, (user) => {
    if (!user) {
      callback(null);
    } else {
      const userObj: User = { email: user.email || "" };
      callback(userObj);
    }
  });
};
