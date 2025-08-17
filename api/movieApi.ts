import apiClient from "./client";

export const addMovie= async (title:string, genre:string, duration:number)=>{
const res=await apiClient.get(`/movie/add-movie?title=${title}&genre=${genre}&duration=${duration}`);
return res.data;
}

