// src/api/bookingApi.ts
import apiClient from "./client"

export const getUserFromToken = async (token: string) => {
    const res = await apiClient.get(`/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  };
  
  export const createUser = async (name: string, email: string) => {
    const res = await apiClient.post(
      `/api/user/createOrIgnore?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
    );
    return res.data;
  };
  






