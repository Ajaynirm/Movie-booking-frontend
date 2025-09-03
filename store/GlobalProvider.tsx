"use client";
import { ReactNode, useEffect } from "react";
import { useSetAtom } from "jotai";
import { setUserAtom} from "@/store/showStore";
import { getUserFromToken } from "@/api/userApi";
import { useAuth } from "@clerk/nextjs";
import Cookies from "js-cookie";
import { checkAuth } from "@/api/auth";

export function GlobalProvider({ children }: { children: ReactNode }) {
 
  const setUser = useSetAtom(setUserAtom);
  const { getToken } = useAuth();
 useEffect(()=>{
    const checkuser=async()=>{
      try{
        const data=await checkAuth();
        console.log(data)
        setUser({
          name: data.name,
          id: parseInt(data.id),
          email: data.email,
        });
      }catch(err){

      }
    }
    checkuser();
 },[])
  useEffect(() => {
    const fetchJwt = async () => {
      try {
        const token = await getToken({ template: "movie-jwt" });
        if (!token) return;
        Cookies.set("auth_token", token, { expires: 1 });
        const data = await getUserFromToken(token);
        setUser({
          name: data.name,
          id: parseInt(data.id),
          email: data.email,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchJwt();
  }, []);

  return <>{children}</>;
}