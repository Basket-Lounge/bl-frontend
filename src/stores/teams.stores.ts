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

  postsArgumentsModified: boolean;
  setPostsArgumentsModified: (value: boolean) => void;

  postsFilterValue: TTeamPostsFilter;
  updatePostsFilterValue: (value: TTeamPostsFilter) => void;
  searchValue: string;
  updateSearchValue: (value: string) => void;

  // Creating posts
  postsCreateTitle: string;
  updatePostsCreateTitle: (value: string) => void;
  postsCreateTitleError: string | null;
  updatePostsCreateTitleError: (value: string | null) => void;
  postsCreateContent: string;
  updatePostsCreateContent: (value: string) => void;
  postsCreateContentError: string | null;
  updatePostsCreateContentError: (value: string | null) => void;

  // Editing posts
  postsEditTitle: string;
  updatePostsEditTitle: (value: string) => void;
  postsEditTitleError: string | null;
  updatePostsEditTitleError: (value: string | null) => void;
  postsEditContent: string;
  updatePostsEditContent: (value: string) => void;
  postsEditContentError: string | null;
  updatePostsEditContentError: (value: string | null) => void;
}

export const TeamStore = createStore<ITeamStore>((set) => ({
  currentScheduleFilterValue: "0",
  updateCurrentScheduleFilterValue: (value) => set({ currentScheduleFilterValue: value }),
  playersFilterValue: "A",
  updatePlayersFilterValue: (value) => set({ playersFilterValue: value }),
  currentPlayerId: null,
  updateCurrentPlayerId: (id) => set({ currentPlayerId: id }),

  postsArgumentsModified: false,
  setPostsArgumentsModified: (value) => set({ postsArgumentsModified: value }),
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

  postsEditTitle: "",
  updatePostsEditTitle: (value) => set({ postsEditTitle: value }),
  postsEditTitleError: "",
  updatePostsEditTitleError: (value) => set({ postsEditTitleError: value }),
  postsEditContent: "",
  updatePostsEditContent: (value) => set({ postsEditContent: value }),
  postsEditContentError: "",
  updatePostsEditContentError: (value) => set({ postsEditContentError: value }),
}));

export const TeamStoreContext = createContext(TeamStore);