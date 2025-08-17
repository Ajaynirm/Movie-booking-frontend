"use client";

import { useStore } from "@/store/useStore";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUser } from "@/api/userApi";
import { toast } from "sonner";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react"
import { getShowDetail } from "@/api/showApi";

interface ShowDetails{
  id: number;
    movieTitle:  String;
    theatreName:  String;
    location:  String;
   showTime:  String;
}

const Page = () => {
  const searchParams = useSearchParams();
  const user = useStore((s) => s.user);

  const setUser = useStore((s) => s.setUser);
  const router = useRouter();
  const [showDetail, setShowDetail] = useState<ShowDetails>();

  // const showId = searchParams.get('showId');
  const showId = searchParams.get("showId");
  const seatLabel = searchParams.get("seatLabel");
  if(!showId){
    return <>
    <div>No show Id found</div>
    </>
  }

  useEffect(()=>{
    const getDetail= async(showId:number)=>{
    try{
      const data= await getShowDetail(showId);
     
      setShowDetail(data);
    } catch(err){
      toast.error("error while getting show details")
    } 

    }
    getDetail(parseInt(showId));
  },[])
  const handleToPayment = async () => {
    if (user?.id) {
      router.push(`/payment?showId=${showId}&seatLabel=${seatLabel}`);
    }
  };

  const handleToGetUser = async () => {
    if (user?.name && user.email) {
      // create user in backend so that we can track the Booked tickets
      try {
        const data = await createUser(user?.name, user?.email);
        setUser(data);
        
      } catch (err) {
        toast.error("Error while Getting User");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Confirmation Before Payment
      </h1>

      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6 grid md:grid-cols-2 gap-8">
        {/* User Details */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            User Details
          </h2>
          <div className="space-y-4">
            {/* Name */}
            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-600 mb-1"
                onClick={() => {
                  console.log(user);
                }}
              >
                Name
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
                value={user?.name || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.target.value,
                  } as typeof user)
                }
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
                value={user?.email || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  } as typeof user)
                }
              />
            </div>
            {!user?.id && (
              <div className="flex justify-center items-center">
                <button
                  className="w-full bg-pink-600  text-white py-2 rounded-lg font-medium "
                  onClick={() => handleToGetUser()}
                >
                  Submit
                </button>
              </div>
            )}
            {user?.id && (
              <div className="flex justify-center items-center">
                <Alert >
                  <CheckCircle2Icon />
                  <AlertTitle>Account Fetched Success</AlertTitle>
                 
                </Alert>
              </div>
            )}
          </div>
        </div>

        {/* Seat Details */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Seat Details
          </h2>
          <div className="space-y-2 text-gray-600">
            <div>Show Id: {showId}</div>
            <div>Theatre: {showDetail?.theatreName}</div>
            <div>Movie: {showDetail?.movieTitle}</div>
            <div>Seat: {seatLabel}</div>
            <div>Show Time: {showDetail?.showTime}</div>
            <div>Price: {200}</div>
          </div>

          {/* Payment Button */}
          {user?.id && (
            <div className="mt-6">
              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors "
                onClick={() => {
                  handleToPayment();
                }}
              >
                Confirm To Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
