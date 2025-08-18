"use client";

import apiClient from "@/api/client";
import { addMovie } from "@/api/movieApi";
import { useState } from "react";
import { toast } from "sonner";

export default function AddMoviePage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await addMovie(title,genre,parseInt(duration));
    
      toast.success(`✅ Movie "${data.title}" added successfully!`);
      setTitle("");
      setGenre("");
      setDuration("");
    } catch (err) {
      toast.error("❌ Error while creating movie");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          🎬 Add a New Movie
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter movie title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Genre</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter genre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Duration (mins)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              min="1"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter duration"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Add Movie
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
