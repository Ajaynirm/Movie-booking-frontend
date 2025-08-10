// src/api/client.ts
import axios from "axios"

const apiClient = axios.create({
  baseURL: "https://movie-booking.zeabur.app",
  headers: {
    "Content-Type": "application/json",
  },
})

// // Optional: Add interceptors for auth tokens
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token")
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

export default apiClient
