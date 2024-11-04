import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IAuthStore {
  userId: number | null;
  setUserId: (userId: number) => void;
  username: string;
  setUsername: (username: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  authenticationAttempted: boolean;
  setAuthenticationAttempted: (authenticationAttempted: boolean) => void;
}

export const useAuthStore = create<IAuthStore>()(
  devtools((set) => ({
    userId: null,
    setUserId: (userId: number) => set({ userId }),
    username: "",
    setUsername: (username: string) => set({ username }),
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
    authenticationAttempted: false,
    setAuthenticationAttempted: (authenticationAttempted: boolean) => set({ authenticationAttempted }),
  }))
);