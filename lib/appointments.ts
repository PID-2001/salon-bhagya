import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Appointment {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  service: string;
  stylist: string;
  date: string;        // "YYYY-MM-DD"
  time: string;        // "HH:MM"
  notes: string;
  status: AppointmentStatus;
  createdAt: Timestamp;
}

const SERVICES = [
  "Hair Cut & Styling",
  "Hair Colour & Highlights",
  "Keratin Treatment",
  "Bridal Package",
  "Facial & Skin Care",
  "Manicure & Pedicure",
  "Eyebrow Threading & Tinting",
  "Makeup Application",
  "Hair Extensions",
  "Scalp Treatment",
];

const STYLISTS = [
  "Any Available",
  "Bhagya",
  "Dilini",
  "Nimesha",
  "Tharushi",
];

export { SERVICES, STYLISTS };

export async function createAppointment(
  data: Omit<Appointment, "id" | "createdAt" | "status">
): Promise<string> {
  const ref = collection(db, "appointments");
  const docRef = await addDoc(ref, {
    ...data,
    status: "pending",
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getUserAppointments(userId: string): Promise<Appointment[]> {
  const ref = collection(db, "appointments");
  const q = query(ref, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  const all: Appointment[] = [];
  snap.forEach((d) => {
    const appt = { id: d.id, ...d.data() } as Appointment;
    if (appt.userId === userId) all.push(appt);
  });
  return all;
}

export async function cancelAppointment(appointmentId: string): Promise<void> {
  const ref = doc(db, "appointments", appointmentId);
  await updateDoc(ref, { status: "cancelled" });
}