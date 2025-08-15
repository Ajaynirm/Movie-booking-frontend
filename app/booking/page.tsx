'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getBooking } from '@/api/bookingApi';

interface Booking {
  id: number;
  userId: number;
  userName: string;
  theatreId: number;
  theatreName: string;
  movieName: string;
  showId: number;
  showTime: string;
  seatLabel: string;
  price: number;
  bookingTime: string;
}

export default function TicketPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const bookingId = searchParams.get('bookingId');

  useEffect(() => {
    if (!bookingId) return;

    let isMounted = true; // Cleanup flag

    const fetchBooking = async () => {
      try {
        setLoading(true);
        const data = await getBooking(parseInt(bookingId, 10));
        if (isMounted) setBooking(data);
      } catch (err) {
        setError('Failed to fetch booking details');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBooking();

    return () => {
      isMounted = false;
    };
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading ticket details...
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error || 'No booking found'}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-300">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          🎟️ Booking Confirmed!
        </h1>

        <div className="border-t border-b py-4 space-y-2">
          <p className="text-sm text-gray-500">Ticket ID</p>
          <p className="text-lg font-semibold">{booking.id}</p>

          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg font-semibold">{booking.userName}</p>

          <p className="text-sm text-gray-500">Movie</p>
          <p className="text-lg font-semibold">{booking.movieName}</p>

          <p className="text-sm text-gray-500">Theatre</p>
          <p className="text-lg font-semibold">
            {booking.theatreName} (ID: {booking.theatreId})
          </p>

          <p className="text-sm text-gray-500">Show Time</p>
          <p className="text-lg font-semibold">
            {new Date(booking.showTime).toLocaleString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </p>

          <p className="text-sm text-gray-500">Seat</p>
          <p className="text-lg font-semibold">{booking.seatLabel}</p>

          <p className="text-sm text-gray-500">Price</p>
          <p className="text-lg font-semibold text-green-600">₹{booking.price}</p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
