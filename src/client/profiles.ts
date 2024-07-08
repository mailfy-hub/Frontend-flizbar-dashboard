import { api } from "./api";

export interface IUser {
  name?: "string",
  surname?: "string",
  username?: "string",
  phone?: "string",
  email?: "string"
}


export const getDetails = async (id: string) => {
  try {
    const { data } = await api.get(`/profiles/${id}/details`)
    return data
  } catch (error) {
    throw new Error(error as string);
  }
}

export const getProfileById = async (id: string) => {
  try {
    const { data } = await api.get(`/profiles/${id}`)
    return data
  } catch (error) {
    throw new Error(error as string);
  }
}