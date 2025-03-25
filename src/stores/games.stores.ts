import { IChatBlacklist } from "@/models/admin.models";
import { TDialogSize } from "@/models/common.models";
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

  managementBoxOpen: boolean;
  setManagementBoxOpen: (open: boolean) => void;
  banUserModalOpen: null | TDialogSize;
  setBanUserModalOpen: (open: null | TDialogSize) => void;
  muteUserModalOpen: null | TDialogSize;
  setMuteUserModalOpen: (open: null | TDialogSize) => void;
  muteEveryoneModalOpen: null | TDialogSize;
  setMuteEveryoneModalOpen: (open: null | TDialogSize) => void;
  slowDownModalOpen: null | TDialogSize;
  setSlowDownModalOpen: (open: null | TDialogSize) => void;
  editMessageModalOpen: null | TDialogSize;
  setEditMessageModalOpen: (open: null | TDialogSize) => void;

  gameChatBlacklist: IChatBlacklist | null;
  setGameChatBlacklist: (blacklist: IChatBlacklist | null) => void;
  gameChatBlacklistError: boolean;
  setGameChatBlacklistError: (error: boolean) => void;
  gameChatBlacklistLoading: boolean;
  setGameChatBlacklistLoading: (loading: boolean) => void;
}

export const GameStore = createStore<IGameStore>((set) => ({
  boxScoreTeamId: null,
  setBoxScoreTeamId: (teamName) => set({ boxScoreTeamId: teamName }),
  subscriptionToken: null,
  setSubscriptionToken: (token) => set({ subscriptionToken: token }),

  managementBoxOpen: false,
  setManagementBoxOpen: (open) => set({ managementBoxOpen: open }),
  banUserModalOpen: null,
  setBanUserModalOpen: (open) => set({ banUserModalOpen: open }),
  muteUserModalOpen: null,
  setMuteUserModalOpen: (open) => set({ muteUserModalOpen: open }),
  muteEveryoneModalOpen: null,
  setMuteEveryoneModalOpen: (open) => set({ muteEveryoneModalOpen: open }),
  slowDownModalOpen: null,
  setSlowDownModalOpen: (open) => set({ slowDownModalOpen: open }),
  editMessageModalOpen: null,
  setEditMessageModalOpen: (open) => set({ editMessageModalOpen: open }),

  gameChatBlacklist: null,
  setGameChatBlacklist: (blacklist) => set({ gameChatBlacklist: blacklist }),
  gameChatBlacklistError: false,
  setGameChatBlacklistError: (error) => set({ gameChatBlacklistError: error }),
  gameChatBlacklistLoading: false,
  setGameChatBlacklistLoading: (loading) => set({ gameChatBlacklistLoading: loading })
}));

export const GameStoreContext = createContext(GameStore);