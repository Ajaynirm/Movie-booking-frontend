import { create } from 'zustand'
import { persist } from "zustand/middleware";

interface User {
  id: number | null;
  name: string | null;
  email: string | null;
}

interface StoreState {
  currShowId: number;
  setCurrShowId: (id: number) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      currShowId: 0,
      setCurrShowId: (id) => set({ currShowId: id }),
      user: null,
      setUser: (user) => set({ user }),

      logout: () =>
        set({
          currShowId: 0,
          user: null,
        }),
    }),
    {
      name: "app-storage", // key in localStorage
    }
  )
);
