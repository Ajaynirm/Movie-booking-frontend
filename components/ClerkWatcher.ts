"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { logoutAtom } from "@/store/showStore";

export function ClerkWatcher() {
  const { isSignedIn } = useAuth();
  const logout = useSetAtom(logoutAtom);

  useEffect(() => {
    if (!isSignedIn) {
      logout(); // reset when Clerk session ends
    }
  }, [isSignedIn]);

  return null;
}
