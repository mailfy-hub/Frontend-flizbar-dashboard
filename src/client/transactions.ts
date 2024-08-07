import { api } from "./api";

export const getAllTransactions = async (id?: string) => {
  try {
    const { data } = await api.get(`/transactions/user/${id}`)
    return data
  } catch (error) {
    throw new Error(error as string);
  }
}