import axios from "axios"
import Cookies from "js-cookie";



const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})


// // Optional: Add interceptors for auth tokens
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default apiClient

