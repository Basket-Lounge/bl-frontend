import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IHistoryStore {
  currentUrl: string;
  setCurrentUrl: (currentUrl: string) => void;
  lastUrl: string;
  setLastUrl: (lastUrl: string) => void;
}

export const useHistoryStore = create<IHistoryStore>()(
  devtools((set) => ({
    currentUrl: "",
    setCurrentUrl: (currentUrl: string) => set({ currentUrl }),
    lastUrl: "",
    setLastUrl: (lastUrl: string) => set({ lastUrl }),
  }))
);