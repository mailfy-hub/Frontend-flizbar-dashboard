import { api } from "./api";

export interface IUser {
  name?: "string",
  surname?: "string",
  username?: "string",
  phone?: "string",
  email?: "string"
}

export const updateUser = async (user: IUser, id: string) => {
  try {
    await api.put(`/users/${id}`, user)
    return
  } catch (error) {
    throw new Error(error as string);
  }
}

