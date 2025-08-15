'use client';

import { CarouselBox } from '@/components/Carousel';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Inter } from 'next/font/google';

// ✅ Industry-grade font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function Home() {
  return (
    <div
      className={`flex flex-col min-h-screen bg-gray-50 text-gray-900 ${inter.className}`}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Carousel */}
        <section aria-labelledby="carousel-heading" className="mb-10">
          <h2 id="carousel-heading" className="sr-only">
            Featured Movies
          </h2>
          <CarouselBox />
        </section>

        {/* Recommended Movies */}
        <section aria-labelledby="recommended-heading">
          <h2
            id="recommended-heading"
            className="text-xl sm:text-2xl font-semibold mb-4"
          >
            Recommended Movies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* Placeholder for movie cards */}
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="aspect-[2/3] bg-gray-200"></div>
                <div className="p-3">
                  <h3 className="text-sm font-medium truncate">
                    Movie Title {i + 1}
                  </h3>
                  <p className="text-xs text-gray-500">Genre</p>
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


