import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IAuthStore {
  userId: number | null;
  setUserId: (userId: number | null) => void;
  username: string | null;
  setUsername: (username: string | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  authenticationAttempted: boolean;
  setAuthenticationAttempted: (authenticationAttempted: boolean) => void;
}

export const useAuthStore = create<IAuthStore>()(
  devtools((set) => ({
    userId: null,
    setUserId: (userId: number | null) => set({ userId }),
    username: null,
    setUsername: (username: string | null) => set({ username }),
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
    authenticationAttempted: false,
    setAuthenticationAttempted: (authenticationAttempted: boolean) => set({ authenticationAttempted }),
  }))
);