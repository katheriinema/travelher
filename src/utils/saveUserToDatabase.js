import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const saveUserToDatabase = async (user) => {
  const db = getFirestore();
  const auth = getAuth();

  try {
    // Ensure the user object is passed correctly
    if (!user) {
      throw new Error("No user data provided.");
    }

    // Save user info to Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
    console.log("User data saved successfully.");
  } catch (error) {
    console.error("Failed to save user data:", error);
    // Allow the flow to continue, even if saving fails
  }
};

export default saveUserToDatabase;
