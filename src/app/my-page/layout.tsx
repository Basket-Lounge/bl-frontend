'use client';

import { getMyInfo } from '@/api/user.api';
import MyPageSectionOptions from '@/components/my-page/MyPageSectionOptions';
import UserHeader from '@/components/my-page/UserHeader';
import { TTeamPostsFilter } from '@/models/team.models';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useEffect } from 'react';
import { createStore } from 'zustand';


interface IMyPageStore {
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
}

export type TSection = "profile" | "posts" | "comments" | "dm";

const MyPageStore = createStore<IMyPageStore>((set) => ({
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
  commentsDeleted: false,
  setCommentsDeleted: (value) => set({ commentsDeleted: value }),
}));

export const MyPageStoreContext = createContext(MyPageStore);

export default function MyPage({ children }: { 
  children: React.ReactNode }
) {
  const queryClient = useQueryClient();
  const query = useSuspenseQuery({
    queryKey: ["my-page", "user-info"], 
    queryFn: async () => {
      return await getMyInfo();
    }
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ["my-page", "user-info"],
        exact: true,
      });
    }
  }, []);

  return (
    <MyPageStoreContext.Provider value={MyPageStore}>
      <div className="my-[32px] flex flex-col items-stretch gap-[24px]">
        <h1 className="text-white text-[32px] font-bold">계정 관리</h1>
        <UserHeader user={query.data} />
        <MyPageSectionOptions />
        {children}
      </div>
    </MyPageStoreContext.Provider>
  );
}