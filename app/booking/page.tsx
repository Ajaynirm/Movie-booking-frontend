'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';
import { getUserBookings } from '@/api/bookingApi';

interface Booking {
  id: number;
  userId: number;
  userName: string;
  TheaterId: string;
  theatreName: string;
  MovieName: string;
  showId: number;
  showTime: string;
  seatLabel: string;
  price: number;
  bookingTime: string;
}

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useStore((s) => s.user);
  
  useEffect(() => {
    const fetchBooking = async (userId: number) => {
      
      try {
        setLoading(true);
        const data = await getUserBookings(userId);
        setBookings(data);
      } catch (err) {
        toast.error("Error while fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchBooking(user.id);
    }
  }, [user?.id]);

  if (!user?.id) {
    return <p className="text-center mt-10">Login to see your bookings.</p>;
  }

  if (loading) return <p className="text-center mt-10">Loading your bookings...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{booking.MovieName}</h2>
              <p className="text-gray-700">
                Theatre: <span className="font-medium">{booking.theatreName}</span>
              </p>
              <p className="text-gray-700">
                Seat: <span className="font-medium">{booking.seatLabel}</span>
              </p>
              <p className="text-gray-700">
                Show Time:{" "}
                <span className="font-medium">
                  {new Date(booking.showTime).toLocaleString()}
                </span>
              </p>
              <p className="text-gray-700">
                Booked On:{" "}
                <span className="font-medium">
                  {new Date(booking.bookingTime).toLocaleString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
