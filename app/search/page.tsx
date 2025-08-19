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
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const handleSearch = async (query: string) => {
      try {
        setLoading(true);
        const data = await search(query);
        setShow(data);
      } catch (err: any) {
        toast.error("Error on Searching !....");
      } finally {
        setLoading(false);
      }
    };

    handleSearch(query);
  }, [query]);
  
  
  return (
    <>
      <div className="flex justify-center items-start gap-3   w-full px-3 py-10">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search movies, theater..."
          className="w-full sm:max-w-md md:max-w-lg lg:max-w-2xl text-sm sm:text-base"
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Close Button */}
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-sm border-2 "
        >
          <X className="w-4 h-4 lg:h-5 lg:w-5" />
        </button>
      </div>

      {loading ? (
        <div className="flex min-h-screen justify-center items-start">
          <div>
            <span className="loading loading-ring loading-xl"></span>
          </div>
        </div>
      ) : (
        <div className="flex justify-center min-h-screen items-start p-2 lg:w-full ">
          <div className="flex  flex-col justify-center items-center   lg:gap-2">
            {shows &&
              shows.length > 0 &&
              shows.map((show, ind) => {
                return (
                  <div
                    key={show.id}
                    className="flex gap-10 border-gray-400 border-2 justify-around items-center rounded-lg lg:h-10 lg:w-150"
                    onClick={() => {
                      router.push(`/shows/${show.id}`);
                    }}
                  >
                    <div>{show.movieName}</div>
                    <div>{show.theatreName}</div>
                    <div>{show.location}</div>
                  </div>
                );
              })}
            {shows && shows.length == 0 && query.trim().length == 0 && (
              <div>Enter Something to Search</div>
            )}
            {shows && shows.length == 0 && query.trim().length != 0 && (
              <div>No shows Found </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
