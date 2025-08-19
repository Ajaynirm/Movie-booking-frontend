"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center p-6">
      <h1 className="text-6xl font-bold ">404</h1>
      <p className="mt-4 text-lg ">Oops! Page not found.</p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
