import apiClient from "./client";

export const search= async (query:string)=>{
const res=await apiClient.get(`/search/get?query=${query}`);
return res.data;
}



