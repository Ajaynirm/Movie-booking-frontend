// /show/get-show?showId=1

import apiClient from "./client"

export const getAllShow = async () => {
  const res = await apiClient.get("/show/get-all-show")
  return res.data
}

export const getShowById = async (showId: number) => {
  const res = await apiClient.get(`/show/get-show?showId=${showId}`)
  return res.data
}


