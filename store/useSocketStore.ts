import { create } from "zustand";
import SockJS from "sockjs-client";
import { Client, StompSubscription, IMessage } from "@stomp/stompjs";

interface SocketState {
  stompClient: Client | null;
  subscriptions: Record<string, StompSubscription>;
  connect: (showId: number, callback: (message: IMessage) => void) => void;
  subscribeToShow: (showId: number, callback: (message: IMessage) => void) => void;
  unsubscribeFromShow: (showId: number) => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  stompClient: null,
  subscriptions: {},

  connect: (showId, callback) => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        set({ stompClient: client });

        // ✅ Subscribe after connection is established
        get().subscribeToShow(showId, callback);
      },
    });

    client.activate();
  },

  subscribeToShow: (showId, callback) => {
    const { stompClient, subscriptions } = get();

    if (!stompClient || !stompClient.connected) {
      console.log("Cannot subscribe: client not connected");
      return;
    }

    if (subscriptions[showId]) return; // already subscribed

    const sub = stompClient.subscribe(`/topic/show/${showId}`, callback);
    set({ subscriptions: { ...subscriptions, [showId]: sub } });
  },

  unsubscribeFromShow: (showId) => {
    const { subscriptions } = get();
    const sub = subscriptions[showId];
    if (sub) {
      sub.unsubscribe();
      const { [showId]: _, ...rest } = subscriptions;
      set({ subscriptions: rest });
      console.log(`Unsubscribed from /topic/show/${showId}`);
    }
  },
}));
