"use client";
import { atom } from "jotai";

interface User {
  id: number | null;
  name: string | null;
  email: string | null;
}

// --- State Atoms ---
export const currShowIdAtom = atom<number>(0);

export const userAtom = atom<User | null>(null); // needs default value

export const counterAtom = atom<number>(0);

// --- Write Atoms ---
export const setCounterAtom = atom(
  null,
  (_get, set, cnt: number) => set(counterAtom, cnt)
);

export const setCurrShowIdAtom = atom(
  null,
  (_get, set, id: number) => set(currShowIdAtom, id)
);

export const setUserAtom = atom(
  null,
  (_get, set, user: User | null) => set(userAtom, user)
);


// --- Special Write Atom ---
export const logoutAtom = atom(null, (_get, set) => {
  set(currShowIdAtom, 0);
  set(userAtom, null);
  set(counterAtom, 0);

});
