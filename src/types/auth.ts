export type UserRoleAccessType = "all" | "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar: string | null;
  surname: string;
}

export interface loginProps {
  email: string;
  password: string;
}

export interface loginResponseProps {
  data: {
    user: User;
    accessToken: string;
    expires: string;
  };
}

export interface SignUpProps {
  name: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  surname: string;
}
