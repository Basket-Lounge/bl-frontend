'use client';

import { Team, TTeamPostsFilter } from '@/models/team.models';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { createStore } from 'zustand';
import { getUser } from '@/api/admin.api';
import AdminUsersDetailsHeader from '@/components/admin-page/AdminUsersDetailsHeader';
import AdminUsersSectionOptions from '@/components/admin-page/AdminUsersSectionOptions';


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

  introduction: string;
  setIntroduction: (value: string) => void;
  prevIntroduction: string;
  setPrevIntroduction: (value: string) => void;

  // Posts Pagination
  postsPaginationpage: number;
  setPostsPaginationPage: (page: number) => void;
  postsFilterValue: TTeamPostsFilter;
  updatePostsFilterValue: (value: TTeamPostsFilter) => void;
  commentsPaginationPage: number;
  setCommentsPaginationPage: (page: number) => void;
  commentsFilterValue: TTeamPostsFilter;
  updateCommentsFilterValue: (value: TTeamPostsFilter) => void;
}

const UserManagementStore = createStore<IUserManagementStore>((set) => ({
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

  introduction: "",
  setIntroduction: (value: string) => set({ introduction: value }),
  prevIntroduction: "",
  setPrevIntroduction: (value: string) => set({ prevIntroduction: value }),

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
  commentsFilterValue: "all",
  updateCommentsFilterValue: (value) => set({ commentsFilterValue: value }),
}));

export const UserManagementStoreContext = createContext(UserManagementStore);

export default function UserPage({ children }: { 
  children: React.ReactNode }
) {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const userQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', 'details', userId as string],
    queryFn: async () => {
      return await getUser(userId as string);
    }
  });

  const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  }

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'users', 'details', userId as string]
      });
    }
  }, []);

  return (
    <UserManagementStoreContext.Provider value={UserManagementStore}>
      <div className="flex flex-col items-stretch gap-[24px]">
        <button 
          className="text-white bg-color1 py-[12px] px-[32px] rounded-full w-fit"
          onClick={handleBackButtonClick}
        >
          👈 뒤로가기
        </button>
        <AdminUsersDetailsHeader user={userQuery.data} />
        <AdminUsersSectionOptions />
        {children}
      </div>
    </UserManagementStoreContext.Provider>
  );
}