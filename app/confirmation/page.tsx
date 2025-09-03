"use client";

import { userAtom, setUserAtom, setCounterAtom } from "@/store/showStore";

import { useAtom, useSetAtom } from "jotai";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUser } from "@/api/userApi";
import { toast } from "sonner";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { getShowDetail } from "@/api/showApi";
import { SkeletonCard } from "@/components/SkeletonCard";
import { AlertDemo } from "@/components/Error";

interface ShowDetails {
  id: number;
  movieTitle: String;
  theatreName: String;
  location: String;
  showTime: String;
}

const Page = () => {
  const [user] = useAtom(userAtom);
  const setCounter = useSetAtom(setCounterAtom);
  const setUser = useSetAtom(setUserAtom);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showDetail, setShowDetail] = useState<ShowDetails>();
  const [loading, setLoading] = useState<boolean>(false);

  const showId = searchParams.get("showId");
  const seatLabel = searchParams.get("seatLabel");

  if (!showId) {
    return (
      <div className="flex justify-start md:justify-center items-center min-h-screen">
        <AlertDemo content={`No show Id found`} />
      </div>
    );
  }

  useEffect(() => {
    const getDetail = async (showId: number) => {
      try {
        setLoading(true);
        const data = await getShowDetail(showId);
        setShowDetail(data);
      } catch (err) {
        toast.error("error while getting show details");
      } finally {
        setLoading(false);
      }
    };
    getDetail(parseInt(showId));
  }, [showId]);

  const handleToPayment = async () => {
    if (user?.id) {
      setCounter(60);
      router.push(`/payment?showId=${showId}&seatLabel=${seatLabel}`);
    }
  };

  const handleToGetUser = async () => {
    if (user?.name && user.email) {
      // create user in backend so that we can track the Booked tickets
      try {
        const data = await createUser(user?.name, user?.email);
        toast.success("Email stored in Backend");
        setUser(data);
      } catch (err) {
        toast.error("Error while Getting User");
      }
    }
  };

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center py-10 min-h-screen">
          <SkeletonCard />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      {/* Header */}
      <h1 className="text-2xl font-semibold  mb-8">
        Confirmation Before Payment
      </h1>

      <div className="w-full max-w-5xl shadow-lg rounded-xl p-6 grid md:grid-cols-2 gap-8">
        {/* User Details */}
        <div>
          <h2 className="text-lg font-medium  mb-4">User Details</h2>
          <div className="space-y-4">
            {/* Name */}
            <div className="flex flex-col">
              <label
                className="text-sm font-medium  mb-1"
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
              <label className="text-sm font-medium  mb-1">Email</label>
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
                <Alert>
                  <CheckCircle2Icon />
                  <AlertTitle>Account Fetched Success</AlertTitle>
                </Alert>
              </div>
            )}
          </div>
        </div>

        {/* Seat Details */}
        <div>
          <h2 className="text-lg font-medium  mb-4">Seat Details</h2>
          <div className="space-y-2 ">
            <div>
              Show Id: <span className="pl-30">{showId}</span>
            </div>
            <DropdownMenuSeparator className="bg-neutral-800 dark:bg-gray-700" />
            <div>
              Theatre: <span className="pl-30">{showDetail?.theatreName}</span>
            </div>
            <DropdownMenuSeparator className="bg-neutral-800 dark:bg-gray-700" />
            <div>
              Movie: <span className="pl-33">{showDetail?.movieTitle}</span>
            </div>
            <DropdownMenuSeparator className="bg-neutral-800 dark:bg-gray-700" />
            <div>
              Seat: <span className="pl-36">{seatLabel}</span>
            </div>
            <DropdownMenuSeparator className="bg-neutral-800 dark:bg-gray-700" />
            <div>
              Show Time: <span className="pl-24">{showDetail?.showTime}</span>
            </div>
            <DropdownMenuSeparator className="bg-neutral-800 dark:bg-gray-700" />
            <div>
              Price: <span className="pl-35">{200}</span>
            </div>
            <DropdownMenuSeparator className="bg-neutral-800 dark:bg-gray-700" />
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