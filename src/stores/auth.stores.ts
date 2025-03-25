import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IAuthStore {
  userId: number | null;
  setUserId: (userId: number | null) => void;
  username: string | null;
  setUsername: (username: string | null) => void;
  userRole: number | null;
  setUserRole: (userRole: number | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  authenticationAttempted: boolean;
  setAuthenticationAttempted: (authenticationAttempted: boolean) => void;

  userBlocklist: {id: number, username: string}[] | null;
  setUserBlocklist: (blocklist: {id: number, username: string}[] | null) => void;
  userBlocklistError: boolean;
  setUserBlocklistError: (error: boolean) => void;
  userBlocklistLoading: boolean;
  setUserBlocklistLoading: (loading: boolean) => void;
}

export const useAuthStore = create<IAuthStore>()(
  devtools((set) => ({
    userId: null,
    setUserId: (userId: number | null) => set({ userId }),
    username: null,
    setUsername: (username: string | null) => set({ username }),
    userRole: null,
    setUserRole: (userRole: number | null) => set({ userRole }),
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
    authenticationAttempted: false,
    setAuthenticationAttempted: (authenticationAttempted: boolean) => set({ authenticationAttempted }),

    userBlocklist: null,
    setUserBlocklist: (blocklist: {id: number, username: string}[] | null) => set({ userBlocklist: blocklist }),
    userBlocklistError: false,
    setUserBlocklistError: (error: boolean) => set({ userBlocklistError: error }),
    userBlocklistLoading: false,
    setUserBlocklistLoading: (loading: boolean) => set({ userBlocklistLoading: loading }),
  }))
);