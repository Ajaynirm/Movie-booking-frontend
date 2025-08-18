'use client'

import { useState, useEffect } from "react";
import { Input } from "./ui/input"
import { useRouter } from "next/navigation";
import {
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
import { ClerkWatcher } from "@/components/ClerkWatcher";
import { DropdownMenuDemo } from "./DropDownMenu";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import { ThemeSwitch } from "./theme-provider";

export const Header = ()=>{
    const router=useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

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
        
     <ThemeSwitch />
    
          <ClerkWatcher />
          {/* <SignedOut>
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white  font-medium text-sm sm:text-base h-9 sm:h-10 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn> */}

          <DropdownMenuDemo />

        </div>
      </div>
    </header>
    </>
}