import { createContext } from "react";
import { createStore } from "zustand";

interface IUserStore {
  postsArgumentsModified: boolean;
  setPostsArgumentsModified: (value: boolean) => void;

  commentsArgumentsModified: boolean;
  setCommentsArgumentsModified: (value: boolean) => void;

  reportCreateTitle: string;
  updateReportCreateTitle: (value: string) => void;
  reportCreateTitleError: string | null;
  updateReportCreateTitleError: (value: string | null) => void;

  reportCreateTypeId: number | null;
  updateReportCreateTypeId: (value: number | null) => void;
  reportCreateTypeIdError: string | null;
  updateReportCreateTypeIdError: (value: string | null) => void;

  reportCreateDescription: string;
  updateReportCreateDescription: (value: string) => void;
  reportCreateDescriptionError: string | null;
  updateReportCreateDescriptionError: (value: string | null) => void;
}

export const UserStore = createStore<IUserStore>((set) => ({
  postsArgumentsModified: false,
  setPostsArgumentsModified: (value: boolean) => set({ postsArgumentsModified: value }),

  commentsArgumentsModified: false,
  setCommentsArgumentsModified: (value: boolean) => set({ commentsArgumentsModified: value }),

  reportCreateTitle: "",
  updateReportCreateTitle: (value) => set({ reportCreateTitle: value }),
  reportCreateTitleError: null,
  updateReportCreateTitleError: (value) => set({ reportCreateTitleError: value }),

  reportCreateTypeId: null,
  updateReportCreateTypeId: (value) => set({ reportCreateTypeId: value }),
  reportCreateTypeIdError: null,
  updateReportCreateTypeIdError: (value) => set({ reportCreateTypeIdError: value }),

  reportCreateDescription: "",
  updateReportCreateDescription: (value) => set({ reportCreateDescription: value }),
  reportCreateDescriptionError: null,
  updateReportCreateDescriptionError: (value) => set({ reportCreateDescriptionError: value }),
}));

export const UserStoreContext = createContext(UserStore);
