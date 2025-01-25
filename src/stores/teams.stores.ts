'use client'

import { createContext } from "react";
import { create, createStore } from "zustand";
import { devtools } from "zustand/middleware";

interface ITeamStore {
  currentScheduleFilterValue: string;
  updateCurrentScheduleFilterValue: (value: string) => void;
  playersFilterValue: string;
  updatePlayersFilterValue: (value: string) => void;
  currentPlayerId: number | null;
  updateCurrentPlayerId: (id: number | null) => void;

  postsArgumentsModified: boolean;
  setPostsArgumentsModified: (value: boolean) => void;

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

export const useTeamStore = create<ITeamStore>()(
  devtools((set) => ({
    currentScheduleFilterValue: "0",
    updateCurrentScheduleFilterValue: (value) => set({ currentScheduleFilterValue: value }),
    playersFilterValue: "A",
    updatePlayersFilterValue: (value) => set({ playersFilterValue: value }),
    currentPlayerId: null,
    updateCurrentPlayerId: (id) => set({ currentPlayerId: id }),

    postsArgumentsModified: false,
    setPostsArgumentsModified: (value) => set({ postsArgumentsModified: value }),

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
  }))
)

export const TeamStoreContext = createContext(TeamStore);