import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Appointment, AppointmentStatus } from "./appointments";
import type { UserProfile } from "./auth";

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  read: boolean;
  createdAt: Timestamp;
}

// ── Appointments ─────────────────────────────────────────────
export async function getAllAppointments(): Promise<Appointment[]> {
  const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Appointment));
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<void> {
  await updateDoc(doc(db, "appointments", id), { status });
}

// ── Users ────────────────────────────────────────────────────
export async function getAllUsers(): Promise<UserProfile[]> {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => d.data() as UserProfile);
}

export async function setUserRole(
  uid: string,
  role: "user" | "admin"
): Promise<void> {
  await updateDoc(doc(db, "users", uid), { role });
}

// ── Messages ─────────────────────────────────────────────────
export async function getAllMessages(): Promise<ContactMessage[]> {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ContactMessage));
}

export async function markMessageRead(id: string): Promise<void> {
  await updateDoc(doc(db, "messages", id), { read: true });
}