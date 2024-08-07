import { api } from "./api";

export const getAllQuotations = async () => {
  try {
    const { data } = await api.get("quotations")
    return data
  } catch (error) {
    throw new Error(error as string);
  }
}

export const createQuotation = async (body: {
  dollar: number,
  euro: number,
  yen: number,
  quotationDate: string | Date
}) => {
  try {
    const { data } = await api.post("quotations", body)
    return data
  } catch (error) {
    throw new Error(error as string);
  }
}

export const updateQuotation = async (body: {
  dollar: number,
  euro: number,
  yen: number,
  quotationDate: string | Date
}, id?: string) => {
  try {
    const { data } = await api.put(`quotations/${id}`, body)
    return data
  } catch (error) {
    throw new Error(error as string);
  }
}

export const deleteQuotation = async (id?: string) => {
  try {
    const { data } = await api.delete(`quotations/${id}`)
    return data
  } catch (error) {
    throw new Error(error as string);
  }
}