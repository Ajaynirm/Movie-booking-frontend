"use client";

import { useEffect, useState } from "react";
import { search } from "@/api/searchApi";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SearchResult {
  id: number;
  theatreName: string;
  movieName: string;
  location: string;
  showTime: string;
}

export default function Search() {
  const router = useRouter();
  const [shows, setShow] = useState<SearchResult[]>();
  const [query,setQuery] = useState<string>("");
  
  useEffect(()=>{
    const handleSearch = async (query: string) => {
        try {
          const data = await search(query);
          setShow(data);
        } catch (err: any) {
          toast.error("Error on Searching !....");
        }
      };
      handleSearch(query);
  },[query]);

  return (
    <>
      <div className="flex justify-center items-center p-10 space-x-4">
        <div>
          <Input
            type="text"
            placeholder="Search movies,theater..."
            size={60}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div>
          <X
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      </div>

        <div className="flex justify-center items-start p-2 lg:w-full lg:h-100 ">
        <div className="flex  flex-col justify-center items-center   lg:gap-2">
        {shows && shows.length>0 && 
            shows.map((show,ind)=>{
                return (
                <div key={show.id} className="flex gap-10 border-gray-400 border-2 justify-around items-center rounded-lg lg:h-10 lg:w-150"
                    onClick={()=>{router.push(`/shows/${show.id}`)}}>
                        <div>{show.movieName}</div>
                        <div>{show.theatreName}</div>
                        <div>{show.location}</div>
                </div>

            )})
            }
            {shows && shows.length==0 && query.trim().length==0 &&
              <div>Enter Something to Search</div>
            }
            {
                shows && shows.length==0 && query.trim().length!=0 &&
                <div>No shows Found </div>
            }
      </div>
        </div>
      
    </>
  );
}
