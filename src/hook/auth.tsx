import { createContext, useContext, useState } from "react";
import { usersMock } from "../mock/data";

export type roleAccessType = "all" | "user" | "admin";

interface AuthContextProps {
  isAuthenticated: boolean;
  userData: User | null;
  login: (credentials: loginProps) => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

interface loginProps {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: roleAccessType;
}

type Props = {
  children?: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = ({ email, password }: loginProps) => {
    const userExist: User | undefined = usersMock.find(
      (user) => user.email === email
    );

    if (!userExist) {
      return;
    }

    if (userExist.password === password) {
      console.log(userExist);
      setIsAuthenticated(true);
      setUserData(userExist);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
