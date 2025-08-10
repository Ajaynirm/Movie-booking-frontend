'use client'

import { Input } from "@/components/ui/input"
import { X } from 'lucide-react';

export default function Search(){
    return(
        <>
         <div className="flex justify-center items-center p-10 space-x-4">
            <div>
                 <Input type="text" placeholder="Search movies,theater..." size={60}/>
            </div>
            <div>
                <X onClick={()=>console.log("HI")}/>
            </div>
             </div>
        </>
       
    )
}