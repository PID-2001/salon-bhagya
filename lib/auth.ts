// lib/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface UserProfile {
  uid:         string;
  email:       string | null;
  displayName: string | null;
  photoURL:    string | null;
  role:        "user" | "admin";
  phone:       string | null;
  createdAt:   unknown; // Firestore Timestamp
}

// ─── Create Firestore user doc ────────────────────────────────────────────────
async function createUserDocument(user: User, extra?: Partial<UserProfile>) {
  const ref = doc(db, "users", user.uid);

  // Only create if doesn't exist yet (protects against duplicate calls)
  const snap = await getDoc(ref);
  if (snap.exists()) return;

  await setDoc(ref, {
    uid:         user.uid,
    email:       user.email,
    displayName: user.displayName ?? extra?.displayName ?? null,
    photoURL:    user.photoURL   ?? null,
    role:        "user",
    phone:       extra?.phone    ?? null,
    createdAt:   serverTimestamp(),
  } satisfies Omit<UserProfile, "createdAt"> & { createdAt: unknown });
}

// ─── Get user profile from Firestore ─────────────────────────────────────────
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

// ─── Register ─────────────────────────────────────────────────────────────────
export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string
) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });
  await createUserDocument(cred.user, { displayName });
  return cred.user;
}

// ─── Login ────────────────────────────────────────────────────────────────────
export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// ─── Google Sign-In ───────────────────────────────────────────────────────────
export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const cred     = await signInWithPopup(auth, provider);
  await createUserDocument(cred.user); // no-op if already exists
  return cred.user;
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────
export async function logout() {
  await signOut(auth);
}

// ─── Forgot Password ──────────────────────────────────────────────────────────
export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}