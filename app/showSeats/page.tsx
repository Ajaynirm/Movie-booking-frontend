"use client";

import { getShowById } from "@/api/showApi";
import { Seat } from "@/components/Seat";
import { useEffect, useState } from "react";

export default function ShowDetails() {
  const [show, setShow] = useState<showProp>();
  const [selectedSeat, setSelectedSeat] = useState<seatProps>();

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const data = await getShowById(2);
        setShow(data);
      } catch (err) {
        console.log("Error while fetch show");
      }
    };
    fetchShow();
  }, []);
  if (!show) {
    return <div>Show fetching failed</div>;
  }
  return (
    <>
      <div className="fixed top-0 left-0 w-full flex flex-col flex-wrap font-sans lg:px-30 py-5 bg-white shadow-md z-30">
        <div className="flex flex-col flex-wrap font-serif">
          <div>Movie: {show.movieTitle}</div>
          <div className="flex justify-around  w-100 ">
            <div>{show.theatreName}: </div>
            <div>{show.location} | </div>
            <div>{show.showTime}</div>
          </div>
        </div>
      </div>

      <div className="flex  flex-col flex-wrap justify-center items-center gap-y-10 pt-36 pb-28">
        <div className="flex flex-wrap w-100 justify-around items-center gap-2 lg:gap-6">
          {show.showSeats.map((seat: seatProps) => {
            return (
              <div
                key={seat.seatLabel}
                onClick={() => {
                  (!seat.booked? setSelectedSeat(seat):"")
                }}
              >
                <Seat
                  id={seat.id}
                  booked={seat.booked}
                  seatLabel={seat.seatLabel}
                  isSelected={selectedSeat?.id === seat.id ? true : false}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center text-xl w-80 lg:w-120 border-2  rounded-lg bg-blue-400 mb-20">
          screen
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white py-4 flex flex-col justify-center items-center shadow-lg lg:gap-2">
        <div className="flex justify-around lg:w-100 text-sm">
          <div className="flex justify-center items-center lg:gap-2">
            <Seat id={0} seatLabel={""} isBooked={false} isSelected={true}/>
            <div>Selected</div>
          </div>
          <div className="flex justify-center items-center lg:gap-2">
          <Seat id={0} seatLabel={""} isBooked={false} isSelected={false}/>
          <div>Available</div>
          </div>
          <div className="flex justify-center items-center lg:gap-2">
          <Seat id={0} seatLabel={""} isBooked={true} isSelected={false}/>
          <div>Booked</div>
          </div>
           
        </div>
      {selectedSeat && (
        
          <button
            className="bg-rose-400 lg:w-100 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            onClick={() => console.log("Booking seat:", selectedSeat)}
          >
            Pay RS. 200
          </button>
       
      )}
      </div>
    </>
  );
}
