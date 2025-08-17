'use client'

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export function ClerkWatcher() {
  const { isSignedIn } = useAuth();
  const logout = useStore((s) => s.logout);

  useEffect(() => {
    if (!isSignedIn) {
      logout(); // reset when Clerk session ends
    }
  }, [isSignedIn]);

  return null;
}
