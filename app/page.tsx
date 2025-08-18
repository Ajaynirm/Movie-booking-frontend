"use client";

import { CarouselBox } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUserFromToken } from "@/api/userApi";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useSetAtom } from "jotai";
import { setUserAtom } from "@/store/showStore";
import { getAllMovies } from "@/api/movieApi";
import { useRouter } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
interface Movie{
 id:number;
 title: string;
 genre: string;
 duration: number;
}

export default function Home() {
  const setUser = useSetAtom(setUserAtom);
  const { getToken } = useAuth();
  const [movies, setMovies] =useState<Movie[]>([]);
  const router = useRouter();


  useEffect(() => {
    const fetchJwt = async () => {
      try {
        const token = await getToken({ template: "movie-jwt" });
        if (!token) return;
        Cookies.set("auth_token", token, { expires: 1 });
        const data = await getUserFromToken(token);
        toast.success("Success from backend auth", data);
        setUser({
          name: data.name,
          id: parseInt(data.id),
          email: data.email,
        });
      } catch (err) {
        toast.error("Error doing login");
      }
    };

    fetchJwt();
  }, []);

  useEffect(()=>{
    const fetchMovies = async ()=>{
      try{
        const data=await getAllMovies();
        setMovies(data);
      }catch{
        console.log("Movie fetching failed");
      }
    }
    fetchMovies();
  },[]);

  return (
    <div
      className={`flex flex-col min-h-screen  p-5 ${inter.className}`}        
    >
      {/* Main Content */}
      <main className="flex-1 w-full px-3 sm:px-6 lg:px-10">
        
        {/* Carousel */}
        <section
          aria-labelledby="carousel-heading"
          className="mb-10 w-full"
        >
          <h2 id="carousel-heading" className="sr-only">
            Featured Movies
          </h2>

          <div className="">
            <CarouselBox />
          </div>
        </section>

        {/* Recommended Movies */}
        <section
          aria-labelledby="recommended-heading"
          className="mb-16"
        >
          <h2
            id="recommended-heading"
            className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-center "
          >
            Recommended Shows
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
  {movies.map((movie, ind) => (
    <div
      key={ind}
      className="rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white dark:bg-gray-800"
      onClick={()=>{router.push("/shows")}}
    >
      {/* Colorful placeholder */}
      <div
        className={`aspect-[2/3] flex items-center justify-center text-white text-lg font-bold
          ${[
            "bg-gradient-to-tr from-pink-500 to-yellow-500",
            "bg-gradient-to-tr from-blue-500 to-purple-600",
            "bg-gradient-to-tr from-green-400 to-emerald-600",
            "bg-gradient-to-tr from-orange-400 to-red-600",
            "bg-gradient-to-tr from-indigo-400 to-cyan-500",
          ][ind % 5]}`}
      >
        {movie.title.charAt(0)}
      </div>

      <div className="p-2 sm:p-3">
        <div className="flex justify-center items-center">
        <h3 className="text-xs sm:text-sm font-medium truncate">
          {movie.title}
        </h3>
        </div>
       
        <div className="flex justify-around items-center">
        <h2 className="text-[10px] sm:text-xs text-purple-300">{movie.genre}</h2>
        <p className="text-xs sm:text-sm text-purple-300">
          {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
        </p>
        </div>
       
      </div>
    </div>
  ))}
</div>

        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
