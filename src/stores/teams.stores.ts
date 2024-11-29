import { TTeamPostsFilter } from "@/models/team.models";
import { createContext } from "react";
import { createStore } from "zustand";

interface ITeamStore {
  currentScheduleFilterValue: string;
  updateCurrentScheduleFilterValue: (value: string) => void;
  playersFilterValue: string;
  updatePlayersFilterValue: (value: string) => void;
  currentPlayerId: number | null;
  updateCurrentPlayerId: (id: number | null) => void;
  postsFilterValue: TTeamPostsFilter;
  updatePostsFilterValue: (value: TTeamPostsFilter) => void;
  searchValue: string;
  updateSearchValue: (value: string) => void;
  postsCreateTitle: string;
  updatePostsCreateTitle: (value: string) => void;
  postsCreateTitleError: string | null;
  updatePostsCreateTitleError: (value: string | null) => void;
  postsCreateContent: string;
  updatePostsCreateContent: (value: string) => void;
  postsCreateContentError: string | null;
  updatePostsCreateContentError: (value: string | null) => void;
}

export const TeamStore = createStore<ITeamStore>((set) => ({
  currentScheduleFilterValue: "0",
  updateCurrentScheduleFilterValue: (value) => set({ currentScheduleFilterValue: value }),
  playersFilterValue: "A",
  updatePlayersFilterValue: (value) => set({ playersFilterValue: value }),
  currentPlayerId: null,
  updateCurrentPlayerId: (id) => set({ currentPlayerId: id }),
  postsFilterValue: "all",
  updatePostsFilterValue: (value) => set({ postsFilterValue: value }),
  searchValue: "",
  updateSearchValue: (value) => set({ searchValue: value }),
  postsCreateTitle: "",
  updatePostsCreateTitle: (value) => set({ postsCreateTitle: value }),
  postsCreateTitleError: "",
  updatePostsCreateTitleError: (value) => set({ postsCreateTitleError: value }),
  postsCreateContent: "",
  updatePostsCreateContent: (value) => set({ postsCreateContent: value }),
  postsCreateContentError: "",
  updatePostsCreateContentError: (value) => set({ postsCreateContentError: value }),
}));

export const TeamStoreContext = createContext(TeamStore);