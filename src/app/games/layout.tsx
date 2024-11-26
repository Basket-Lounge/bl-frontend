'use client'

import { createContext } from "react";
import { createStore } from "zustand";


interface IAllGamesStore {
  gamesParamsModified: boolean;
  setGamesParamsModified: (modified: boolean) => void;

  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;

  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

const AllGamesStore = createStore<IAllGamesStore>((set) => ({
  gamesParamsModified: false,
  setGamesParamsModified: (modified: boolean) => {
    set({ gamesParamsModified: modified });
  },
  startDate: undefined,
  setStartDate: (date) => {
    set({ startDate: date });
  },
  endDate: undefined,
  setEndDate: (date) => {
    set({ endDate: date });
  }
}));

export const AllGamesStoreContext = createContext(AllGamesStore);

const allGamesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AllGamesStoreContext.Provider value={AllGamesStore}>
      {children}
    </AllGamesStoreContext.Provider>
  );
}

export default allGamesLayout;