"use client";

// context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile, type UserProfile } from "@/lib/auth";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuthContextValue {
  /** Raw Firebase user (null = signed out, undefined = loading) */
  user:        User | null | undefined;
  /** Full Firestore profile including role */
  profile:     UserProfile | null;
  isAdmin:     boolean;
  isLoading:   boolean;
  /** Call after any profile update to force a refresh */
  refreshProfile: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue>({
  user:           undefined,
  profile:        null,
  isAdmin:        false,
  isLoading:      true,
  refreshProfile: async () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null | undefined>(undefined);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const isLoading = user === undefined;
  const isAdmin   = profile?.role === "admin";

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const p = await getUserProfile(user.uid);
    setProfile(p);
  }, [user]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const p = await getUserProfile(firebaseUser.uid);
        setProfile(p);
      } else {
        setProfile(null);
      }
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, isAdmin, isLoading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthContext);
}