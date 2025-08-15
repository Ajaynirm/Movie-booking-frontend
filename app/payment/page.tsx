'use client';

import React, { useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { bookSeats } from '@/api/bookingApi';
import { toast } from 'react-hot-toast';

const PaymentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const showId = searchParams.get('showId');
  const userId = searchParams.get('userId');
  const seatLabel = searchParams.get('seatLabel');

  const [loading, setLoading] = useState(false);

  const handleBooking = useCallback(async () => {
    if (!showId || !userId || !seatLabel) {
      toast.error('Missing booking details.');
      return;
    }

    setLoading(true);
    try {
      const res = await bookSeats(
        parseInt(showId, 10),
        parseInt(userId, 10),
        seatLabel
      );
      
      toast.success('Booking successful!');
      console.log('Booking Response:', res);

      // Redirect to booking confirmation page
      router.push(`/booking/?bookingId=${res.id}`);
    } catch (err) {
      console.error(err);
      toast.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [showId, userId, seatLabel, router]);

  if (!showId || !userId || !seatLabel) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Missing required booking parameters in URL.
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Payment Simulation
        </h1>

        <div className="mb-4">
          <p><strong>Show ID:</strong> {showId}</p>
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Seat Label:</strong> {seatLabel}</p>
          <p className="mt-2 text-lg font-semibold">Price: ₹200</p>
        </div>

        <button
          onClick={handleBooking}
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white font-semibold ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing...' : 'Confirm Payment'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;



