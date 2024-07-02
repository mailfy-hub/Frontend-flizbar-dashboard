import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../client/api";
import {
  SignUpProps,
  User,
  loginProps,
  loginResponseProps,
} from "../types/auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  userData: User | null;
  signUp: (info: SignUpProps) => Promise<void>;
  signUpAdmin: (info: SignUpProps) => Promise<void>;
  login: (credentials: loginProps) => Promise<void>;
  logout: () => void;
  isLoadingData: boolean;
  accessToken: string | null;
}

const AuthContext = createContext({} as AuthContextProps);

type Props = {
  children?: React.ReactNode;
};

const LOCAL_STORAGE_KEY = "flizbar-storage-data";

export const AuthContextProvider = ({ children }: Props) => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async ({ email, password }: loginProps) => {
    const { data }: loginResponseProps = await api.post("/auth/login", {
      email,
      password,
    });
    setIsAuthenticated(true);
    saveToLocalStorage({
      user: data.user,
      token: data.accessToken,
    });

    setUserData(data.user);
    setAccessToken(data.accessToken);
    api.defaults.headers.common = {
      Authorization: `Bearer ${data.accessToken}`,
    };
  };

  const signUp = async ({
    email,
    password,
    name,
    surname,
    phone,
    username,
  }: SignUpProps): Promise<void> => {
    await api.post("/users", {
      email,
      password,
      name,
      surname,
      phone,
      username,
    });
  };

  const signUpAdmin = async ({
    email,
    password,
    name,
    surname,
    phone,
    username,
  }: SignUpProps): Promise<void> => {
    await api.post("/users/admin", {
      email,
      password,
      name,
      surname,
      phone,
      username,
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setAccessToken(null);
    removeFromLocalStorage();
  };

  const saveToLocalStorage = ({
    user,
    token,
  }: {
    user: User;
    token: string;
  }) => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}-user`, JSON.stringify(user));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}-token`, JSON.stringify(token));
  };

  const removeFromLocalStorage = () => {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}-user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}-token`);
  };

  const loadFromLocalStorage = () => {
    setIsLoadingData(true);
    const userLS = localStorage.getItem(`${LOCAL_STORAGE_KEY}-user`);
    const tokenLS = localStorage.getItem(`${LOCAL_STORAGE_KEY}-token`);
    if (userLS && tokenLS) {
      const userDataParsed: User = JSON.parse(userLS);
      const tokenDataParsed: string = JSON.parse(tokenLS);
      setUserData(userDataParsed);
      setAccessToken(tokenDataParsed);
      setIsAuthenticated(true);

      api.defaults.headers.common = {
        Authorization: `Bearer ${tokenDataParsed}`,
      };
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
        accessToken,
        signUp,
        signUpAdmin,
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
