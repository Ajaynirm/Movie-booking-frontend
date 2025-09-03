
import apiClient from "./client"


export const checkAuth = async()=>{
    const res=await apiClient.get("/api/user/check-auth");
    return res.data;
}


