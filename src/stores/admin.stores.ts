import { Team, TTeamPostsFilter } from "@/models/team.models";
import { createContext } from "react";
import { createStore } from "zustand";

interface IAdminPageStore {
  // Reports
  reportsArgumentsModified: boolean;
  setReportsArgumentsModified: (modified: boolean) => void;

  // Inquiries
  inquiriesArgumentsModified: boolean;
  setInquiriesArgumentsModified: (modified: boolean) => void;

  // User Management
  lastUserExploredId: string | null;
  setLastUserExploredId: (userId: string | null) => void;
  userArgumentsModified: boolean;
  setUserArgumentsModified: (modified: boolean) => void;

  lastModifiedPostId: string | null;
  setLastModifiedPostId: (postId: string | null) => void;
  postsArgumentsModified: boolean;
  setPostsArgumentsModified: (modified: boolean) => void;

  lastModifiedCommentId: string | null;
  setLastModifiedCommentId: (commentId: string | null) => void;
  commentArgumentsModified: boolean;
  setCommentArgumentsModified: (modified: boolean) => void;

  lastModifiedChatId: string | null;
  setLastModifiedChatId: (chatId: string | null) => void;
  chatArgumentsModified: boolean;
  setChatArgumentsModified: (modified: boolean) => void;
}

export const AdminPageStore = createStore<IAdminPageStore>((set) => ({
  reportsArgumentsModified: false,
  setReportsArgumentsModified: (modified: boolean) => {
    set({ reportsArgumentsModified: modified });
  },

  inquiriesArgumentsModified: false,
  setInquiriesArgumentsModified: (modified: boolean) => {
    set({ inquiriesArgumentsModified: modified });
  },

  lastUserExploredId: null,
  setLastUserExploredId: (userId: string | null) => {
    set({ lastUserExploredId: userId });
  },

  userArgumentsModified: false,
  setUserArgumentsModified: (modified: boolean) => {
    set({ userArgumentsModified: modified });
  },

  lastModifiedPostId: null,
  setLastModifiedPostId: (postId: string | null) => {
    set({ lastModifiedPostId: postId });
  },
  postsArgumentsModified: false,
  setPostsArgumentsModified: (modified: boolean) => {
    set({ postsArgumentsModified: modified });
  },

  lastModifiedCommentId: null,
  setLastModifiedCommentId: (commentId: string | null) => {
    set({ lastModifiedCommentId: commentId });
  },
  commentArgumentsModified: false,
  setCommentArgumentsModified: (modified: boolean) => {
    set({ commentArgumentsModified: modified });
  },

  lastModifiedChatId: null,
  setLastModifiedChatId: (chatId: string | null) => {
    set({ lastModifiedChatId: chatId });
  },
  chatArgumentsModified: false,
  setChatArgumentsModified: (modified: boolean) => {
    set({ chatArgumentsModified: modified });
  },
}));

export const AdminPageStoreContext = createContext(AdminPageStore);


interface IUserManagementStore {
  // Account Settings
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

  role: number;
  setRole: (value: number) => void;
  prevRole: number;
  setPrevRole: (value: number) => void

  teamLikes: Team[];
  setTeamLikes: (value: Team[]) => void;
  prevTeamLikes: Team[];
  setPrevTeamLikes: (value: Team[]) => void;

  allTeams: Team[];
  setAllTeams: (value: Team[]) => void;

  introduction: string;
  setIntroduction: (value: string) => void;
  prevIntroduction: string;
  setPrevIntroduction: (value: string) => void;

}

export const UserManagementStore = createStore<IUserManagementStore>((set) => ({
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

  role: 0,
  setRole: (value: number) => set({ role: value }),
  prevRole: 0,
  setPrevRole: (value: number) => set({ prevRole: value }),

  teamLikes: [],
  setTeamLikes: (value: Team[]) => set({ teamLikes: value }),
  prevTeamLikes: [],
  setPrevTeamLikes: (value: Team[]) => set({ prevTeamLikes: value }),

  allTeams: [],
  setAllTeams: (value: Team[]) => set({ allTeams: value }),

  introduction: "",
  setIntroduction: (value: string) => set({ introduction: value }),
  prevIntroduction: "",
  setPrevIntroduction: (value: string) => set({ prevIntroduction: value }),
}));

export const UserManagementStoreContext = createContext(UserManagementStore);