import apiClient from "./client"

interface ShowRequest {
  theatreId: number;
  movieId: number;
  showTime: string; 
}

export const getAllShow = async () => {
  const res = await apiClient.get("/show/get-all-show");
  return res.data;
}

export const getShowById = async (showId: number) => {
  const res = await apiClient.get(`/show/get-show?showId=${showId}`);
  return res.data;
}

export const getShowDetail=async (id: number)=>{
  const res= await apiClient.get(`/show/get-show-detail?id=${id}`);
  return res.data;
}


export const createShow= async(data: ShowRequest)=>{
const res=await apiClient.post(`/show/add-show`,data);
return res;

}
