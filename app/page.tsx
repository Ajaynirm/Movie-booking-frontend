"use client";

import { CarouselBox } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { getAllMovies } from "@/api/movieApi";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "@/components/SkeletonCard";
import { AlertDemo } from "@/components/Error";
import { checkAuth } from "@/api/auth";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: number;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getAllMovies();
        setMovies(data);
      } catch {
        console.log("Movie fetching failed");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className={`flex flex-col min-h-screen  p-5 ${inter.className}`}>
      {/* Main Content */}
      <main className="flex-1 w-full px-3 sm:px-6 lg:px-10">
        {/* Carousel */}
        <section aria-labelledby="carousel-heading" className="mb-10 w-full">
          <h2 id="carousel-heading" className="sr-only">
            Featured Movies
          </h2>

          <div className="">
            <CarouselBox />
          </div>
        </section>
        <main className="flex items-center justify-around h-80 w-full  p-6 ">
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center sm:justify-around">
            {/* Book Show */}
            <div
              onClick={() => {
                router.push("/shows");
              }}
              className="flex items-center justify-center bg-pink-600 text-white font-semibold rounded-2xl shadow-md border-2 border-pink-600 
                 h-14 sm:h-20 w-full sm:w-1/2 cursor-pointer 
                 transition-transform transform hover:scale-105 hover:bg-pink-700"
            >
              Book Show
            </div>

            {/* View Tickets */}
            <div
              onClick={() => {
                router.push("/booking");
              }}
              className="flex items-center justify-center bg-pink-600 text-white font-semibold rounded-2xl shadow-md border-2 border-pink-600 
                 h-14 sm:h-20 w-full sm:w-1/2 cursor-pointer 
                 transition-transform transform hover:scale-105 hover:bg-pink-700"
            >
              View Tickets
            </div>
          </div>
        </main>

        {/* Recommended Movies */}
        <section aria-labelledby="recommended-heading" className="mb-16">
          <h2
            id="recommended-heading"
            className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-center "
          >
            Recommended Movies
          </h2>

          {loading ? (
            <div className="flex justify-around items-center py-10">
              <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
            </div>
          ) : movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {movies.map((movie, ind) => (
                <div
                  key={ind}
                  className="rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white dark:bg-gray-800"
                  onClick={() => {
                    router.push("/shows");
                  }}
                >
                  {/* Colorful placeholder */}
                  <div
                    className={`aspect-[2/3] flex items-center justify-center text-white text-lg font-bold
          ${
            [
              "bg-gradient-to-tr from-pink-500 to-yellow-500",
              "bg-gradient-to-tr from-blue-500 to-purple-600",
              "bg-gradient-to-tr from-green-400 to-emerald-600",
              "bg-gradient-to-tr from-orange-400 to-red-600",
              "bg-gradient-to-tr from-indigo-400 to-cyan-500",
            ][ind % 5]
          }`}
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
                      <h2 className="text-[10px] sm:text-xs text-purple-300">
                        {movie.genre}
                      </h2>
                      <p className="text-xs sm:text-sm text-purple-300">
                        {Math.floor(movie.duration / 60)}h {movie.duration % 60}
                        m
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center  p-2">
              <div>
                <AlertDemo content="No movies available" />
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
