import app from "../../../../lib/firebase/firebaseClient";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);
signOut(auth)
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
  });
