"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { bookSeats } from "@/api/bookingApi";
import { toast } from "react-hot-toast";
import { useAtom } from "jotai";
import { userAtom, counterAtom } from "@/store/showStore";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { AlertDemo } from "@/components/Error";


const PaymentPage = () => {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const [GlobalCounter] = useAtom(counterAtom);
  const [counter, setCounter] = useState<number>(GlobalCounter);
  const searchParams = useSearchParams();


  const  showId = searchParams.get('showId');
  const seatLabel=searchParams.get('seatLabel');

  const [loading, setLoading] = useState(false);

  // countdown effect
  useEffect(() => {
    if (counter === 0) {
      toast.error("Payment session timed out ⏰");
      setTimeout(() => {
        router.push(`/shows/${showId}`);
      }, 3000);

      return;
    }

    const timer = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, router, showId]);

  const handleBooking = async () => {
    if (!showId || !user?.id || !seatLabel) {
      toast.error("Missing booking details.");
      return;
    }

    if (counter === 0) {
      toast.error("Payment session expired.");
      return;
    }

    setLoading(true);
    try {
      const res = await bookSeats(parseInt(showId, 10), user.id, seatLabel);

      toast.success("Booking successful!");
      router.push(`/booking/ticket-confirmed?bookingId=${res.id}`);
    } catch (err) {
      console.error(err);
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!showId || !user?.id || !seatLabel) {
    return (
      <div className="flex justify-start md:justify-center items-center min-h-screen">
        <AlertDemo content={`Missing required booking parameters in URL.`} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center gap-5 min-h-screen p-6">
      <div className="shadow-lg rounded-md p-6 w-full max-w-md dark:border-gray-500 border-2">
        <h1 className="text-2xl font-bold mb-4 text-center p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          Yeppo Pay Payment Simulation
        </h1>
        <DropdownMenuSeparator className="bg-neutral-800 dark:bg-gray-700" />

        <div>
          <div className="pb-10 flex flex-col justify-center items-center">
            <div>Time Remaining</div>
            <span className="countdown font-mono text-5xl">
              <span
                style={{ "--value": counter } as React.CSSProperties}
                aria-live="polite"
                aria-label={counter.toString()}
              >
                {counter}
              </span>
            </span>
            {counter === 0 && (
              <p className="text-red-500 font-semibold mt-4">
                Session Timed Out
              </p>
            )}
          </div>

          <div className="text-lg font-bold">Request :</div>
          <div className="text-sm text-center font-semibold pt-10 pb-15">
            Payment Request from Seat Booking App
          </div>
          <p className="mt-2 text-lg font-bold pb-20">
            Price: <span className="text-md font-semibold pl-10 ">₹200</span>
          </p>
          <DropdownMenuSeparator className="bg-neutral-800 dark:bg-gray-700" />
        </div>

        <button
          onClick={handleBooking}
          disabled={loading || counter === 0}
          className={`w-full py-2 px-4 rounded font-semibold border-2 cursor-pointer 
            ${
              counter === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            }`}
        >
          {loading
            ? "Processing..."
            : counter === 0
            ? "Timeout"
            : "Pay through Yeppo"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
