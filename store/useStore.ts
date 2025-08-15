import { create } from 'zustand'
import { getShowById } from "@/api/showApi";

interface StoreState {
    currShowId: number ; 
    setCurrShowId: (id:number)=>void;
  }

export const useStore = create<StoreState>((set,get) => ({
  currShowId: 1,
  setCurrShowId: (id)=>set({currShowId: id}),
}))
