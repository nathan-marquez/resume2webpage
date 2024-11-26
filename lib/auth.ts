import { AuthResponse } from "@/types/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";

export const loginWithGoogle = async (): Promise<AuthResponse> => {
  const provider = new GoogleAuthProvider();
  
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || '';
    
    return {
      user: {
        email: result.user.email || ''
      },
      token
    };
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};