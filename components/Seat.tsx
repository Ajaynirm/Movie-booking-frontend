'use client'
import { Armchair } from "lucide-react";

export const Seat = ({ id, isBooked, seatLabel, isSelected}: seatProps) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        p-2 rounded-lg
        ${isBooked ? "bg-gray-300 shadow-inner cursor-not-allowed" : "border-2 border-green-500 cursor-pointer"}
        transition duration-200
        ${isSelected ? "bg-green-300":""}
      `}
      onClick={() => {
        if (!isBooked) console.log(seatLabel);
      }}
    >
      <Armchair
        size={10}
        strokeWidth={1}
        color={isBooked ? "red" : "green"}
        className="mb-1"
        aria-hidden="true"
      />
      <span className="text-xs font-medium">{seatLabel}</span>
    </div>
  );
};

  


