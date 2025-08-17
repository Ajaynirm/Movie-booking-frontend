"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createShow } from "@/api/showApi";
import { toast } from "sonner";

interface ShowRequest {
  theatreId: number;
  movieId: number;
  showTime: string; 
}

export default function AddShowPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<ShowRequest>({
    theatreId: 0,
    movieId: 0,
    showTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await createShow(formData);
      toast.success("Show created:", res.data);
    } catch (err: any) {
      toast.error(err);
      setError("Failed to create show. Please check inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Show</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Theatre ID</label>
          <input
            type="number"
            name="theatreId"
            value={formData.theatreId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Movie ID</label>
          <input
            type="number"
            name="movieId"
            value={formData.movieId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Show Time</label>
          <input
            type="datetime-local"
            name="showTime"
            value={formData.showTime}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Show"}
        </button>
      </form>
    </div>
  );
}
