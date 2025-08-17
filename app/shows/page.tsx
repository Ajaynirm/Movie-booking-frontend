"use client";

import { useRouter } from "next/navigation";
import { getAllShow } from "@/api/showApi";
import DateBox from "@/components/DateBox";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";


export default function ShowPage() {
  const currShowId = useStore((state)=> state.currShowId);
  const setCurrShowId=useStore((state)=>state.setCurrShowId);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [shows, setShows] = useState<showDetail[]>();
  useEffect(() => {
    const fetchShow = async () => {
      try {
        setLoading(true);
        const data = await getAllShow();
        setShows(data);
      } catch (err) {
        setError("Error while fetching shows list ");
      } finally {
        setLoading(false);
      }
    };
    fetchShow();
  }, []);
  if (loading) {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-200 gap-2">
          <div>Loading</div>
          <SkeletonCard />
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div>{error}</div>
      </>
    );
  }

  if (shows) {
    return (
      <>
        <div className="flex flex-col justify-center items-center bg-gray-100 p-10 ">
          <div className="p-5 font-bold text-xl">Shows </div>

          {/* show list for particular location */}
          <div className="flex flex-col justify-center items-center  gap-2  w-full ">
            {shows.map((show) => {
              return (
                <div
                  key={show.id}
                  className="flex flex-wrap justify-between md:justify-around lg:justify-between text-sm  w-full     rounded-sm  bg-white p-2 mx-10"
                  onClick={()=>{setCurrShowId(show.id);router.push(`/shows/${show.id}`)}}
                >
                  <div className="flex flex-col justify-between">
                    <div className="flex lg:text-xl font-bold">
                      <div>{show.theatreName}: </div>
                      <div className="pl-5">{show.location}</div>
                    </div>
                    
                    <div>{show.movieTitle}</div>

                    <div className="flex justify-center items-center border-2 rounded-sm text-green-600 border-gray-300 ">
                      <div >
                      {new Date(show.showTime).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                      </div>
                     
                    </div>
                  </div>

                  <div className="">
                    <DateBox
                      day={new Date(show.showTime).toLocaleString("en-US", {
                        weekday: "short",
                      })}
                      date={new Date(show.showTime).getDate()}
                      month={new Date(show.showTime).toLocaleString("en-US", {
                        month: "short",
                      })}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
