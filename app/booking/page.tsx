"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/showStore";
import { toast } from "sonner";
import { getUserBookings } from "@/api/bookingApi";
import { useRouter } from "next/navigation";

interface Booking {
  id: number;
  userId: number;
  userName: string;
  TheaterId: string;
  theatreName: string;
  movieName: string;
  showId: number;
  showTime: string;
  seatLabel: string;
  price: number;
  bookingTime: string;
}

 const  UserBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAtom(userAtom);
  const router=useRouter();

  useEffect(() => {
    const fetchBooking = async (userId: number) => {
      try {
        setLoading(true);
        let data = await getUserBookings(userId);

        // Sort: upcoming first (ascending by showTime)
        data = data.sort(
          (a: Booking, b: Booking) =>
            new Date(a.showTime).getTime() - new Date(b.showTime).getTime()
        );
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

  if (loading)
    return <p className="text-center mt-10">Loading your bookings...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">🎟 My Tickets</h1>

      {bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="shadow-lg rounded-2xl overflow-hidden border relative"
              onClick={()=>{router.push(`/booking/ticket-confirmed?bookingId=${booking.id}`)}}
            >
              {/* Ticket header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white  p-4">
                <h2 className="text-xl font-bold text-yellow-400">{booking.movieName}</h2>
                <p className="text-sm opacity-80">
                  {booking.theatreName}
                </p>
              </div>

              {/* Ticket body */}
              <div className="p-4 relative">
                <div className="flex justify-between mb-2">
                  <p className="text-red-400">Seat</p>
                  <p className="font-semibold text-red-400">{booking.seatLabel}</p>
                </div>

                <div className="flex justify-between mb-2">
                  <p className="text-purple-500">Show Time</p>
                  <p className="font-semibold text-purple-500">
                    {new Date(booking.showTime).toLocaleString()}
                  </p>
                </div>

                <div className="flex justify-between mb-2">
                  <p className="text-purple-500">Booked On</p>
                  <p className="font-semibold text-purple-500">
                    {new Date(booking.bookingTime).toLocaleString()}
                  </p>
                </div>

                <div className="flex justify-between border-t pt-2 mt-3">
                  <p className="text-green-600">Price</p>
                  <p className="font-semibold">₹{booking.price}</p>
                </div>
              </div>

              {/* Ticket cutout effect */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 bg-gray-600 border rounded-full"></div>
              <div className="absolute top-1/2 -right-3 w-6 h-6 bg-gray-600 border rounded-full"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBookingsPage;