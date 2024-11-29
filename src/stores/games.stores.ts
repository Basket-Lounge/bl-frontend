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

export const AllGamesStore = createStore<IAllGamesStore>((set) => ({
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

interface IGameStore {
  boxScoreTeamId: string | null;
  setBoxScoreTeamId: (teamName: string | null) => void;
  subscriptionToken: string | null;
  setSubscriptionToken: (token: string | null) => void;
}

export const GameStore = createStore<IGameStore>((set) => ({
  boxScoreTeamId: null,
  setBoxScoreTeamId: (teamName) => set({ boxScoreTeamId: teamName }),
  subscriptionToken: null,
  setSubscriptionToken: (token) => set({ subscriptionToken: token }),
}));

export const GameStoreContext = createContext(GameStore);