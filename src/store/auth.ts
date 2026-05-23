import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/data/site";

export type Role = "admin" | "reader";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  createdAt: string;
};

type State = {
  user: User | null;
  readers: Array<User & { password: string }>;
  loginAdmin: (email: string, password: string) => { ok: boolean; error?: string };
  loginReader: (email: string, password: string) => { ok: boolean; error?: string };
  signupReader: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  resetPassword: (email: string, password: string) => { ok: boolean; error?: string };
  updateProfile: (patch: Partial<Pick<User, "name" | "avatar">>) => void;
  logout: () => void;
};

export const useAuth = create<State>()(
  persist(
    (set, get) => ({
      user: null,
      readers: [],
      loginAdmin: (email, password) => {
        if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase() || password !== ADMIN_PASSWORD) {
          return { ok: false, error: "Invalid admin credentials." };
        }
        set({
          user: {
            id: "admin-1",
            email: ADMIN_EMAIL,
            name: "The Author",
            role: "admin",
            createdAt: new Date().toISOString(),
          },
        });
        return { ok: true };
      },
      loginReader: (email, password) => {
        const r = get().readers.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
        );
        if (!r) return { ok: false, error: "Email or password is incorrect." };
        const { password: _pw, ...user } = r;
        set({ user });
        return { ok: true };
      },
      signupReader: (name, email, password) => {
        const exists = get().readers.some((u) => u.email.toLowerCase() === email.toLowerCase());
        if (exists) return { ok: false, error: "An account with that email already exists." };
        if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
        const u: User & { password: string } = {
          id: "r-" + Math.random().toString(36).slice(2, 9),
          email,
          name,
          role: "reader",
          password,
          createdAt: new Date().toISOString(),
        };
        set({ readers: [...get().readers, u], user: { id: u.id, email: u.email, name: u.name, role: u.role, createdAt: u.createdAt } });
        return { ok: true };
      },
      resetPassword: (email, password) => {
        const idx = get().readers.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
        if (idx < 0) return { ok: false, error: "No account with that email." };
        const readers = [...get().readers];
        readers[idx] = { ...readers[idx], password };
        set({ readers });
        return { ok: true };
      },
      updateProfile: (patch) => {
        const u = get().user;
        if (!u) return;
        set({ user: { ...u, ...patch } });
      },
      logout: () => set({ user: null }),
    }),
    { name: "midas-auth" },
  ),
);
