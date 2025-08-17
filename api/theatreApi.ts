// src/api/theatreApi.ts
import apiClient from "./client"

export const getAllTheatres = async () => {
  const res = await apiClient.get("/theatre/get-all-theatre");
  return res.data
}

export const getTheatreById = async (id: number) => {
  const res = await apiClient.get(`/theatregey-theatre?id=${id}`);
  return res.data
}

export const addTheatre = async (name:string,location:string,rows:string,seatsPerRow:string)=>{
  const res=await apiClient.get(`/theatre/add-theatre?name=${name}&location=${location}&rows=${rows}&seatsPerRow=${seatsPerRow}`);
  return res.data;
}








