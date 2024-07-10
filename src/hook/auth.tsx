import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../client/api";
import {
  Profile,
  SignUpProps,
  User,
  loginProps,
  loginResponseProps,
} from "../types/auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  userData: User | null;
  profile: Profile | null;
  signUp: (info: SignUpProps) => Promise<void>;
  signUpAdmin: (info: SignUpProps) => Promise<void>;
  login: (credentials: loginProps) => Promise<void>;
  logout: () => void;
  isLoadingData: boolean;
  accessToken: string | null;
  handleFullfiledAccountInfo: (value: boolean) => void;
  isFullfiledAccountInfo: boolean;
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

  const [profile, setProfile] = useState<Profile | null>(null);

  const [isFullfiledAccountInfo, setIsFullfiledAccountInfo] = useState(false);

  const login = async ({ email, password }: loginProps) => {
    try {
      const { data }: loginResponseProps = await api.post("/auth/login", {
        email,
        password,
      });

      api.defaults.headers.common = {
        Authorization: `Bearer ${data.accessToken}`,
      };

      await loadUserProfile(data.user.id);

      // setUserData(data.user);
      setAccessToken(data.accessToken);
      setIsAuthenticated(true);
      saveToLocalStorage({
        user: data.user,
        token: data.accessToken,
      });

      /* setUserData(data.user); */

      api.defaults.headers.common = {
        Authorization: `Bearer ${data.accessToken}`,
      };
    } catch (error) {
      throw error;
    }
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
    setProfile(null);
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

  const loadFromLocalStorage = async () => {
    try {
      const userLS = localStorage.getItem(`${LOCAL_STORAGE_KEY}-user`);
      const tokenLS = localStorage.getItem(`${LOCAL_STORAGE_KEY}-token`);
      if (userLS && tokenLS) {
        const userDataParsed: User = JSON.parse(userLS);
        const tokenDataParsed: string = JSON.parse(tokenLS);

        api.defaults.headers.common = {
          Authorization: `Bearer ${tokenDataParsed}`,
        };

        const profile = await loadUserProfile(userDataParsed.id);
        verifyAccountData(profile);

        setAccessToken(tokenDataParsed);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadUserProfile = async (id: string): Promise<Profile> => {
    try {
      setIsLoadingData(true);
      const { data } = await api.get(`/profiles/${id}`);

      setProfile(data);
      setUserData(data.user);
      setIsLoadingData(false);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const verifyAccountData = (profile: Profile) => {
    const isClientDetailsFilled = profile?.clientDetails == null ? false : true;
    const isClientAddressesFilled =
      profile?.clientAddresses.length > 0 ? true : false;
    const isClientContactsFilled =
      profile?.clientContacts.length > 0 ? true : false;
    const isClientFinanceFilled = profile?.clientFinance == null ? false : true;
    const isClientBeneficiaryFilled =
      profile?.beneficiaries.length > 0 ? true : false;
    const isContractAcceptedFilled = profile?.contractAccepted;

    const isFullfiledAccountData =
      !!isClientDetailsFilled &&
      !!isClientAddressesFilled &&
      !!isClientContactsFilled &&
      !!isClientFinanceFilled &&
      !!isClientBeneficiaryFilled &&
      isContractAcceptedFilled;

    setIsFullfiledAccountInfo(isFullfiledAccountData);
  };

  const handleFullfiledAccountInfo = (value: boolean) => {
    setIsFullfiledAccountInfo(value);
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
        profile,
        isFullfiledAccountInfo,
        handleFullfiledAccountInfo,
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
