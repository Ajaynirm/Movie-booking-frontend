"use client";

import { useRouter } from "next/navigation";
import { getAllShow } from "@/api/showApi";
import DateBox from "@/components/DateBox";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { currShowIdAtom,setCurrShowIdAtom } from "@/store/showStore";
import { AlertDemo } from "@/components/Error";

export default function ShowPage() {
  const [currShowId] = useAtom(currShowIdAtom);
  const setCurrShowId = useSetAtom(setCurrShowIdAtom);

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
      <div className="flex justify-start md:justify-center items-center min-h-screen">
      <div><AlertDemo content={error}/></div>

      </div>
        
      </>
    );
  }
        
  if (shows) {
    return (
      <>
        <div className="flex flex-col justify-center items-center  p-10 ">
          <div className="p-5 font-bold text-xl">Shows </div>

          {/* show list for particular location */}
          <div className="flex flex-col justify-center items-center  gap-2  w-full ">
            {shows.map((show) => {
              return (
                <div
                  key={show.id}
                  className="flex flex-wrap justify-between md:justify-around lg:justify-between text-sm  w-full  border-2 border-gray-600   rounded-sm  p-2 mx-10"
                  onClick={() => {
                    setCurrShowId(show.id);
                    router.push(`/shows/${show.id}`);
                  }}
                >
                  <div className="flex flex-col justify-between">
                    <div className="flex lg:text-xl font-bold">
                      <div>{show.theatreName}: </div>
                      <div className="pl-5">{show.location}</div>
                    </div>

                    <div>{show.movieTitle}</div>

                    <div className="flex justify-center items-center border-2 rounded-sm text-green-600 ">
                      <div>
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





