'use client';

import React, { useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { bookSeats } from '@/api/bookingApi';
import { toast } from 'react-hot-toast';
import { useStore } from '@/store/useStore';

const PaymentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useStore((s) => s.user);

  const showId = searchParams.get('showId');
  const seatLabel = searchParams.get('seatLabel');

  const [loading, setLoading] = useState(false);

  const handleBooking = useCallback(async () => {
    if (!showId || !user?.id || !seatLabel) {
      toast.error('Missing booking details.');
      return;
    }

    setLoading(true);
    try {
      const res = await bookSeats(
        parseInt(showId, 10),
        user.id,
        seatLabel
      );
      
      toast.success('Booking successful!');
      console.log('Booking Response:', res);

      // Redirect to booking confirmation page
      router.push(`/booking/ticket-confirmed?bookingId=${res.id}`);
    } catch (err) {
      console.error(err);
      toast.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [showId, user?.id, seatLabel, router]);

  if (!showId || !user?.id || !seatLabel) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Missing required booking parameters in URL.
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center gap-5 min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center font-bold pb-20">
          Yeppo Pay Payment Simulation
        </h1>

        <div className="mb-4">
          <div className='text-lg font-bold'>Cart :</div>
          <div className='text-sm text-center font-semibold pb-10'> Payment Request from Seat Booking App</div>
          <p className="mt-2 text-lg font-bold">Price: <span className='text-md font-semibold pl-10'>₹200</span></p>
          
        </div>

        <button
          onClick={handleBooking}
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white font-semibold ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing...' : 'Pay through Yeppo'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;



