import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import { firebaseAuth } from "./firebase";

export async function signUpWithEmail(email: string, password: string): Promise<UserCredential> {
  try {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
}

export async function signInWithEmail(email: string, password: string): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
}