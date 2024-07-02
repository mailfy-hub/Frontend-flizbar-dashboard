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

  const login = async ({ email, password }: loginProps) => {
    const { data }: loginResponseProps = await api.post("/auth/login", {
      email,
      password,
    });

    const profile = await loadUserProfile(data.user.id);
    setProfile(profile);

    setIsAuthenticated(true);
    saveToLocalStorage({
      user: profile.user,
      token: data.accessToken,
    });

    /* setUserData(data.user); */
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
      setIsLoadingData(true);
      const userLS = localStorage.getItem(`${LOCAL_STORAGE_KEY}-user`);
      const tokenLS = localStorage.getItem(`${LOCAL_STORAGE_KEY}-token`);
      if (userLS && tokenLS) {
        const userDataParsed: User = JSON.parse(userLS);
        const tokenDataParsed: string = JSON.parse(tokenLS);

        setUserData(userDataParsed);
        setAccessToken(tokenDataParsed);
        setIsAuthenticated(true);

        const profile = await loadUserProfile(userDataParsed.id);
        setProfile(profile);

        api.defaults.headers.common = {
          Authorization: `Bearer ${tokenDataParsed}`,
        };
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const loadUserProfile = async (id: string) => {
    try {
      const { data } = await api.get<{ profile: Profile }>(`/profiles/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data.profile;
    } catch (error) {
      throw error;
    }
  };

  const verifyAccountData = () => {
    const isAddressFilled =
      profile?.clientAddresses?.every(
        (address) =>
          address.clientId &&
          address.addressType &&
          address.documentNumber &&
          address.zipCode &&
          address.city &&
          address.state &&
          address.street &&
          address.number &&
          address.neighborhood &&
          address.complement &&
          address.reference
      ) ?? false;

    const isFinanceFilled =
      profile?.clientFinance &&
      profile.clientFinance.profileId &&
      profile.clientFinance.contactType &&
      profile.clientFinance.bankName &&
      profile.clientFinance.accountNumber &&
      profile.clientFinance.accountDigit &&
      profile.clientFinance.agencyNumber &&
      profile.clientFinance.agencyDigit &&
      profile.clientFinance.pixKeyType &&
      profile.clientFinance.pixKey;

    // const isContactFilled = profile?.clientContacts?.length > 0 ?? false;

    const isFullfiledAccountData =
      isAddressFilled && isFinanceFilled && isContactFilled;
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
