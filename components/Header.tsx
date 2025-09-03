'use client'

import { useState, useEffect } from "react";
import { Input } from "./ui/input"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
    useClerk,
  } from '@clerk/nextjs'
import { DropdownMenuDemo } from "./DropDownMenu";
import { Search } from "lucide-react";
import { ThemeSwitch } from "./theme-provider";
import { toast } from "sonner";
import { useAtom, useSetAtom } from "jotai";
import { setUserAtom, userAtom } from "@/store/showStore";

export const Header = ()=>{
    const router=useRouter();
    const [mounted, setMounted] = useState(false);
    const [user] = useAtom(userAtom);
    const setUser=useSetAtom(setUserAtom);
    const { signOut } = useClerk();

    useEffect(() => setMounted(true), []);

    return<>
        <header className="w-full  shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-4 sm:gap-8 flex-1">
          {/* Logo */}
          <div className="text-xl font-bold cursor-pointer">🎬 Logo</div>

          {/* Search (hidden on small) */}
          <div className="hidden sm:flex flex-1 max-w-lg">
            <Input
              type="text"
              placeholder="Search movies, theaters..."
              className="w-full"
              onClick={() => router.push("/search")}
            />
          </div>

          {/* Mobile Search Icon */}
          <button
            className="sm:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => router.push("/search")}
          >
            <Search className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Right: Auth + Menu */}
        <div className="flex items-center gap-4">
        {user ? 
        <button
          onClick={async (e) => {
            e.preventDefault(); 
            try {
              await signOut();
              setUser(null);
              Cookies.set("auth_token", "");
              toast.success("Logout successfully");
              setTimeout(() => router.push("/"), 500);
            } catch (err) {
              toast.error("Logout Failed");
            }
          }}
          className="text-red-500  cursor-pointer"
        >
          Log out
        </button>

          : <div
          onClick={async (e) => {
            e.preventDefault();
            try {
              router.push("/auth/sign-in"); 
            } catch (err) {
              toast.error("Redirect Failed");
            }
          }}
          className="text-green-500  cursor-pointer"
        >
          Sign In
        </div>}

           <ThemeSwitch />
          <DropdownMenuDemo />

        </div>
      </div>
    </header>
    </>
}