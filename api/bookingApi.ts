// src/api/bookingApi.ts
import apiClient from "./client"

export const bookSeats = async (showId: number, seatIds: number[]) => {
  const res = await apiClient.post(`/bookings`, { showId, seatIds })
  return res.data
}

export const getUserBookings = async () => {
  const res = await apiClient.get(`/bookings/my`)
  return res.data
}
