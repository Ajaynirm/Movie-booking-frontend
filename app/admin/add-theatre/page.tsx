"use client";

import { useState } from "react";
import { addTheatre } from "@/api/theatreApi";
import { toast } from "sonner";

export default function AddTheatrePage() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rows: "",
    seatsPerRow: "",
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addTheatre( formData.name,formData.location,formData.rows,formData.seatsPerRow);
      toast.success(`✅ Theatre added: ${res.name} (${res.location})`);
    } catch (err: any) {
      toast.error("❌ Failed to add theatre");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add Theatre</h2>

        <input
          type="text"
          name="name"
          placeholder="Theatre Name"
          value={formData.name}
          onChange={handleChange}           
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="number"
          name="rows"
          placeholder="Number of Rows"
          value={formData.rows}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="number"
          name="seatsPerRow"
          placeholder="Seats Per Row"
          value={formData.seatsPerRow}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Theatre
        </button>

        
      </form>
    </div>
  );
}
