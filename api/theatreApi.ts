// src/api/theatreApi.ts
import apiClient from "./client"

export const getAllTheatres = async () => {
  const res = await apiClient.get("/theatres")
  return res.data
}

export const getTheatreById = async (id: number) => {
  const res = await apiClient.get(`/theatres/${id}`)
  return res.data
}
