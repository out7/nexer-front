import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "../lib/axios";
import { initData } from "@telegram-apps/sdk-react";
import { components, operations } from "../lib/api/types/generated";

type User = components["schemas"]["CustomerResponseDto"];

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("user", user);

  const refreshUserData = async () => {
    try {
      const response =
        await api.get<
          operations["CustomerController_getProfile"]["responses"]["200"]["content"]["application/json"]
        >("/customer/me");
      setUser(response.data);
    } catch (err: any) {
      console.error("Error fetching user profile:", err);
      if (err.response?.status !== 401) {
        setError("Ошибка при получении данных пользователя");
        logout();
      }
      throw err;
    }
  };

  const authenticate = async () => {
    try {
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken) {
        await refreshUserData();
        setIsLoading(false);
        return;
      }

      const initDataRaw = initData.raw();
      if (!initDataRaw) {
        setError("Вы не авторизованы в Telegram");
        setIsLoading(false);
        return;
      }

      const response = await api.post<
        operations["AuthController_authUser"]["responses"]["200"]["content"]["application/json"]
      >("/auth/tma", {
        data: initDataRaw,
      });

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      await refreshUserData();
    } catch (err: any) {
      console.error("Authentication error:", err);
      setError("Ошибка авторизации");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, logout, refreshUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
