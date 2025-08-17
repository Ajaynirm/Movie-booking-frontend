'use client'

import { Input } from "./ui/input"
import { useRouter } from "next/navigation";
import {
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
import { ClerkWatcher } from "@/components/ClerkWatcher";
import { toast } from "sonner";
import { DropdownMenuDemo } from "./DropDownMenu";

export const Header = ()=>{
    const router=useRouter();

    return<>
        <div className="flex flex-row justify-between items-center h-20 mx-10">
            <div className="flex justify-around items-center lg:w-200">
             <div>logo</div>
             <div onClick={()=>{
                router.push("/search")
             }}>
             <Input type="text" placeholder="Search movies,theater" size={70}/>
             </div>
            </div>

            <div className="flex justify-around items-center lg:w-100">
                <div>Location</div>
                <div>
                <ClerkWatcher />
            <SignedOut>
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
                </div>
                 <div onClick={()=>{toast.success("hi")}}>
                    
                    <DropdownMenuDemo  />
                 </div>
            </div>
                    
                    
        </div>
    </>
}