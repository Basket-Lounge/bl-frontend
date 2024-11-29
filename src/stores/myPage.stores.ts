import { Team, TTeamPostsFilter } from "@/models/team.models";
import { createContext } from "react";
import { createStore } from "zustand";

interface IMyPageStore {
  // For account-settings
  isProfileVisible: boolean;
  setIsProfileVisible: (value: boolean) => void;
  prevIsProfileVisible: boolean;
  setPrevIsProfileVisible: (value: boolean) => void;

  isChatBlocked: boolean;
  setIsChatBlocked: (value: boolean) => void;
  prevIsChatBlocked: boolean;
  setPrevIsChatBlocked: (value: boolean) => void;

  username: string;
  setUsername: (value: string) => void;
  prevUsername: string;
  setPrevUsername: (value: string) => void;

  introduction: string;
  setIntroduction: (value: string) => void;
  prevIntroduction: string;
  setPrevIntroduction: (value: string) => void;

  likedTeams: Team[];
  setLikedTeams: (value: Team[]) => void;
  prevLikedTeams: Team[];
  setPrevLikedTeams: (value: Team[]) => void;

  allTeams: Team[];
  setAllTeams: (value: Team[]) => void;

  postsPaginationpage: number;
  setPostsPaginationPage: (page: number) => void;
  postsFilterValue: TTeamPostsFilter;
  updatePostsFilterValue: (value: TTeamPostsFilter) => void;
  commentsPaginationPage: number;
  setCommentsPaginationPage: (page: number) => void;
  commentsFilterValue: TTeamPostsFilter;
  updateCommentsFilterValue: (value: TTeamPostsFilter) => void;
  commentsDeleted: boolean;
  setCommentsDeleted: (value: boolean) => void;

  chatDeleted: boolean;
  setChatDeleted: (value: boolean) => void;
  chatArgumentsModified: boolean;
  setChatArgumentsModified: (modified: boolean) => void;

  inquiriesCreateTitle: string;
  updateInquiriesCreateTitle: (value: string) => void;
  inquiriesCreateTitleError: string | null;
  updateInquiriesCreateTitleError: (value: string | null) => void;

  inquiriesCreateTypeId: number | null;
  updateInquiriesCreateTypeId: (value: number | null) => void;
  inquiriesCreateTypeIdError: string | null;
  updateInquiriesCreateTypeIdError: (value: string | null) => void;

  inquiriesCreateContent: string;
  updateInquiriesCreateContent: (value: string) => void;
  inquiriesCreateContentError: string | null;
  updateInquiriesCreateContentError: (value: string | null) => void;

  postArgumentsModified: boolean;
  setPostArgumentsModified: (modified: boolean) => void;

  commentArgumentsModified: boolean;
  setCommentArgumentsModified: (modified: boolean) => void;
}

export const MyPageStore = createStore<IMyPageStore>((set) => ({
  isProfileVisible: false,
  setIsProfileVisible: (value: boolean) => set({ isProfileVisible: value }),
  prevIsProfileVisible: false,
  setPrevIsProfileVisible: (value: boolean) => set({ prevIsProfileVisible: value }),

  isChatBlocked: false,
  setIsChatBlocked: (value: boolean) => set({ isChatBlocked: value }),
  prevIsChatBlocked: false,
  setPrevIsChatBlocked: (value: boolean) => set({ prevIsChatBlocked: value }),

  username: "",
  setUsername: (value: string) => set({ username: value }),
  prevUsername: "",
  setPrevUsername: (value: string) => set({ prevUsername: value }),

  introduction: "",
  setIntroduction: (value: string) => set({ introduction: value }),
  prevIntroduction: "",
  setPrevIntroduction: (value: string) => set({ prevIntroduction: value }),

  likedTeams: [],
  setLikedTeams: (value: Team[]) => set({ likedTeams: value }),
  prevLikedTeams: [],
  setPrevLikedTeams: (value: Team[]) => set({ prevLikedTeams: value }),

  allTeams: [],
  setAllTeams: (value: Team[]) => set({ allTeams: value }),

  postsPaginationpage: 1,
  setPostsPaginationPage: (page: number) => {
    if (page < 1) {
      return;
    }
    set({ postsPaginationpage: page })
  },
  postsFilterValue: "all",
  updatePostsFilterValue: (value) => set({ postsFilterValue: value }),
  commentsPaginationPage: 1,
  setCommentsPaginationPage: (page: number) => {
    if (page < 1) {
      return;
    }
    set({ commentsPaginationPage: page });
  },

  postArgumentsModified: false,
  setPostArgumentsModified: (modified) => set({ postArgumentsModified: modified }),

  commentArgumentsModified: false,
  setCommentArgumentsModified: (modified) => set({ commentArgumentsModified: modified }),
  commentsFilterValue: "all",
  updateCommentsFilterValue: (value) => set({ commentsFilterValue: value }),
  commentsDeleted: false,
  setCommentsDeleted: (value) => set({ commentsDeleted: value }),

  chatDeleted: false,
  setChatDeleted: (value) => set({ chatDeleted: value }),
  chatArgumentsModified: false,
  setChatArgumentsModified: (modified) => set({ chatArgumentsModified: modified }),

  inquiriesCreateTitle: "",
  updateInquiriesCreateTitle: (value) => set({ inquiriesCreateTitle: value }),
  inquiriesCreateTitleError: "",
  updateInquiriesCreateTitleError: (value) => set({ inquiriesCreateTitleError: value }),
  inquiriesCreateTypeId: null,
  updateInquiriesCreateTypeId: (value) => set({ inquiriesCreateTypeId: value }),
  inquiriesCreateTypeIdError: "",
  updateInquiriesCreateTypeIdError: (value) => set({ inquiriesCreateTypeIdError: value }),
  inquiriesCreateContent: "",
  updateInquiriesCreateContent: (value) => set({ inquiriesCreateContent: value }),
  inquiriesCreateContentError: "",
  updateInquiriesCreateContentError: (value) => set({ inquiriesCreateContentError: value }),
}));

export const MyPageStoreContext = createContext(MyPageStore);