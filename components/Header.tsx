'use client'

import { Input } from "./ui/input"
import { Menu } from "lucide-react"

export const Header = ()=>{
    return<>
        <div className="flex flex-row justify-between items-center h-20 mx-10">
            <div className="flex justify-around items-center lg:w-200">
             <div>logo</div>
             <div>
             <Input type="text" placeholder="Search movies,theater" size={70}/>
             </div>
            </div>

            <div className="flex justify-around items-center lg:w-100">
                <div>Location</div>
                 <div>
                    <Menu />
                 </div>
            </div>
                    
                    
        </div>
    </>
}