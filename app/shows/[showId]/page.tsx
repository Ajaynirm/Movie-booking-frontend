"use client";

import { use } from "react";
import { getShowById } from "@/api/showApi";
import { Seat } from "@/components/Seat";
import { useEffect, useState } from "react";
import DateBox from "@/components/DateBox";
import { useSocketStore } from "@/store/useSocketStore";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// app/movies/[id]/page.tsx
interface PageProps {
  params: Promise<{ showId: number }>;
}

export default function ShowDetails({ params }: PageProps) {
  const searchParams = useSearchParams();
  const unsubscribeFromShow = useSocketStore((s) => s.unsubscribeFromShow);
  const router = useRouter();

  const [show, setShow] = useState<showProp>();
  const [seats, setSeats] = useState<seatProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedSeat, setSelectedSeat] = useState<seatProps>();
  const showId = use(params);

  // Utility: group seats by first character in seatLabel
const groupSeatsByRow = (seats: seatProps[]) => {
  const rows: { [row: string]: seatProps[] } = {};
  seats.forEach((seat) => {
    const row = seat.seatLabel.charAt(0); // A, B, C...
    if (!rows[row]) rows[row] = [];
    rows[row].push(seat);
  });

  // keep seats in order (A1, A2...)
  Object.keys(rows).forEach((row) => {
    rows[row].sort(
      (a, b) =>
        parseInt(a.seatLabel.slice(1)) - parseInt(b.seatLabel.slice(1))
    );
  });

  return rows;
};

const groupedSeats = groupSeatsByRow(seats);

  if (!showId) {
    return (
      <>
        <div>No show Id to show</div>
      </>
    );
  }

  useEffect(() => {
    const fetchShow = async () => {
      try {
        setLoading(true);
        const data = await getShowById(showId.showId);
        setShow(data);
        setSeats(data.showSeats);
      } catch (err) {
        setError("Error while fetch show");
      } finally {
        setLoading(false);
      }
    };
    fetchShow();
  }, [showId]);

  useEffect(() => {
    const connectSocket = async () => {
      try {
        useSocketStore.getState().connect(showId.showId, (message) => {
          const updatedSeat = JSON.parse(message.body);
          console.log("Seat update:", updatedSeat);

          setSeats((prevSeats) =>
            prevSeats.map((seat) =>
              seat.id === updatedSeat.id
                ? { ...seat, booked: updatedSeat.booked }
                : seat
            )
          );
        });
      } catch (err) {
        toast.error("error while connect to Sockets");
      }
    };
    connectSocket();

    return () => {
      unsubscribeFromShow(showId.showId);
    };
  }, [showId]);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    <div className="flex justify-center items-center">
      <div>{error}</div>
    </div>;
  }

  if (show)
    return (
      <>
        <div className="flex flex-col justify-center items-center  p-2 ">
          <div className="w-full flex justify-between items-center text-sm  border-2  h-25   rounded-sm   p-2 ">
            <div className="flex lg:text-2xl font-bold">
              <div>{show.theatreName}: </div>
              <div>{show.location}</div>
            </div>

            <div className="lg:text-2xl">{show.movieTitle}</div>

            <div className="flex justify-center items-center border-2 rounded-sm text-green-500 border-gray-300 lg:h-10 lg:w-30">
              {new Date(show.showTime).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </div>
            <div className="">
              <DateBox
                day={new Date(show.showTime).toLocaleString("en-US", {
                  weekday: "short",
                })}
                date={new Date(show.showTime).getDate()}
                month={new Date(show.showTime).toLocaleString("en-US", {
                  month: "short",
                })}
              />
            </div>
          </div>
        </div>



        {/* <div className="flex  flex-col flex-wrap justify-center items-center gap-y-10 pt-36 pb-28">
          <div className="flex flex-wrap w-100 justify-around items-center gap-2 lg:gap-6">
            {seats.map((seat: seatProps) => {
              return (
                <div
                  key={seat.seatLabel}
                  onClick={() => {
                    !seat.booked ? setSelectedSeat(seat) : "";
                  }}
                >
                  <Seat
                    id={seat.id}
                    booked={seat.booked}
                    seatLabel={seat.seatLabel}
                    isSelected={selectedSeat?.id === seat.id}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center text-xl w-80 lg:w-120 border-2  rounded-lg bg-blue-400 mb-20">
            screen
          </div>
        </div> */}

<div className="flex flex-col flex-wrap justify-center items-center gap-y-10 pt-36 pb-28">
<TransformWrapper
  initialScale={0.3}
  minScale={0.6}
  maxScale={4}
  centerOnInit
  wheel={{ step: 0.2 }}
  pinch={{ step: 5 }}
 
>
  <TransformComponent
    wrapperClass="w-full h-[70vh] border rounded-lg flex justify-center items-center"
    contentClass="flex flex-col gap-4"
  >
    <div className="flex flex-col gap-3">
      {Object.entries(groupedSeats).map(([row, rowSeats]) => (
        <div key={row} className="flex items-center gap-4">
          {/* Row Label (e.g. A, B, C) */}
          <div className="w-6 text-right font-bold">{row}</div>

          {/* Row Seats */}
          <div className="flex gap-2">
            {rowSeats.map((seat) => (
              <div
                key={seat.seatLabel}
                onClick={() => !seat.booked && setSelectedSeat(seat)}
              >
                <Seat
                  id={seat.id}
                  booked={seat.booked}
                  seatLabel={seat.seatLabel}
                  isSelected={selectedSeat?.id === seat.id}
                />
              </div>
            ))}
          </div>

          {/* Row Label on right too (for symmetry) */}
          <div className="w-6 font-bold">{row}</div>
        </div>
      ))}
    </div>
  </TransformComponent>
</TransformWrapper>


  <div className="flex justify-center items-center text-xl w-80 lg:w-120 border-2 rounded-lg bg-blue-400 mb-20">
    screen
  </div>
</div>



        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-black py-4 flex flex-col justify-center items-center shadow-lg lg:gap-2">
          <div className="flex justify-around lg:w-100 text-sm">
            <div className="flex justify-center items-center lg:gap-2">
              <Seat id={0} seatLabel={""} booked={false} isSelected={true} />
              <div>Selected</div>
            </div>
            <div className="flex justify-center items-center lg:gap-2">
              <Seat id={0} seatLabel={""} booked={false} isSelected={false} />
              <div>Available</div>
            </div>
            <div className="flex justify-center items-center lg:gap-2">
              <Seat id={0} seatLabel={""} booked={true} isSelected={false} />
              <div>Booked</div>
            </div>
          </div>
          {selectedSeat && (
            <button
              className="bg-rose-400 lg:w-100 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
              onClick={() => {
                router.push(
                  `/confirmation?showId=${showId.showId}&seatLabel=${selectedSeat.seatLabel}`
                );
              }}
            >
              Pay RS. 200
            </button>
          )}
        </div>
      </>
    );
}


