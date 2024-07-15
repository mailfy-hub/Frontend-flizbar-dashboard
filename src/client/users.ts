import { api } from "./api";

export interface IUser {
  name?: string,
  surname?: string,
  username?: string,
  phone?: string,
  email?: string
}

export interface IUserById {
  avatar: string,
  createdAt: string,
  deletedAt: string,
  email: string,
  id: string,
  isAdmin: boolean,
  lastAccess: string,
  name: string,
  password: string,
  phone: string,
  surname: string,
  updatedAt: string,
  username: string
  verified: boolean
}

export interface IUserDetails {
  profileId?: string,
  personType?: string,
  nationality?: string,
  documentType?: string,
  document?: string,
  gender?: string,
  corporateName?: string,
  maritalStatus?: string,
  education?: string,
  politicalPerson?: true,
  profession?: string,
  declaresUsTaxes?: true,
  spouseDetails?: object,
  spouse?: true,
  birthDate?: string,
  fatherName?: string,
  motherName?: string
  name?: string,
}

export const updateUser = async (user: IUser, id: string) => {
  try {
    await api.put(`/users/${id}`, user)
    return
  } catch (error) {
    throw new Error(error as string);
  }
}

export const getUserById = async (id: string) => {
  try {
    const { data } = await api.get(`/users/${id}`)
    return data
  } catch (error) {
    throw new Error(error as string);
  }
}

export const updateDetailsUser = async (details: IUserDetails, id: string) => {
  try {
    await api.put(`/profiles/details/${id}`, details)
    return
  } catch (error) {
    throw new Error(error as string);
  }
}

