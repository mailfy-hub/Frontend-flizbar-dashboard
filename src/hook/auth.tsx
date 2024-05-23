import { createContext, useContext, useEffect, useState } from "react";
import { usersMock } from "../mock/data";

export type roleAccessType = "all" | "user" | "admin";

interface AuthContextProps {
  isAuthenticated: boolean;
  userData: User | null;
  login: (credentials: loginProps) => void;
  logout: () => void;
  isLoadingData: boolean;
  getUserRole: () => roleAccessType;
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

const LOCAL_STORAGE_KEY = "flizbar-storage-data";

export const AuthContextProvider = ({ children }: Props) => {
  const [isLoadingData, setIsLoadingData] = useState(false);
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

      saveToLocalStorage({
        userData: userExist,
      });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    removeFromLocalStorage();
  };

  const saveToLocalStorage = (data: { userData: User }) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const getUserRole = () => {
    if (userData) {
      return userData.role;
    } else {
      return "user";
    }
  };

  const loadFromLocalStorage = () => {
    setIsLoadingData(true);
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData.userData);
      setIsAuthenticated(true);
    }
    setIsLoadingData(false);
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        login,
        logout,
        isLoadingData,
        getUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
