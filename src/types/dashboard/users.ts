export interface User {
  avatar: string | null;
  createdAt: string;
  deletedAt: string | null;
  email: string;
  id: string;
  isAdmin: boolean;
  lastAccess: string | null;
  name: string;
  password: string;
  phone: string | null;
  surname: string;
  updatedAt: string;
  username: string;
  verified: boolean;
  personType: string
  customId: string;
}