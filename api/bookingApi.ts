// src/api/bookingApi.ts
import apiClient from "./client"

export const bookSeats = async (showId: number,userId: number, seatLabel: string) => {
  const res = await apiClient.post(`/booking/book`, { showId, userId, seatLabel })
  return res.data
}

export const getUserBookings = async (userId: number) => {
  const res = await apiClient.get(`/booking/user/${userId}`);
  return res.data
}

export const getBooking = async (id: number ) =>{
  const res = await apiClient.get(`/booking/get-booking?id=${id}`);
 return res.data;
}


