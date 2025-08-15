"use client";

import { useEffect } from "react";
import { useSocketStore } from "@/store/useSocketStore";

const page = () => {
    const connect = useSocketStore((s) => s.connect);
  const subscribeToShow = useSocketStore((s) => s.subscribeToShow);
  const unsubscribeFromShow = useSocketStore((s) => s.unsubscribeFromShow);

  useEffect(() => {
    const connectSocket = async () => {
      try {
        connect();
        subscribeToShow(1, (message) => {
            console.log("Seat update:", JSON.parse(message.body));
          }); 

        return () => {
          unsubscribeFromShow(1);
        };
      } catch (err) {
        console.log(err, { "error msg": "failed to connect to web sockets  " });
      }
    };
    connectSocket();
  }, []);
  return (
    <>
      <div>
        <div>page</div>
      </div>
    </>
  );
};

export default page;
