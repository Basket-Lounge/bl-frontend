'use client';

import { getUserInfo } from '@/api/user.api';
import UserSectionOptions from '@/components/user-page/UserSectionOptions';
import UserHeader from '@/components/user-page/UserHeader';
import { TTeamPostsFilter } from '@/models/team.models';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { createContext, useEffect } from 'react';
import { createStore } from 'zustand';


interface IUserStore {
  postsPaginationpage: number;
  setPostsPaginationPage: (page: number) => void;
  postsFilterValue: TTeamPostsFilter;
  updatePostsFilterValue: (value: TTeamPostsFilter) => void;
  commentsPaginationPage: number;
  setCommentsPaginationPage: (page: number) => void;
  commentsFilterValue: TTeamPostsFilter;
  updateCommentsFilterValue: (value: TTeamPostsFilter) => void;

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

const UserStore = createStore<IUserStore>((set) => ({
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

export default function UserPage({ children }: { 
  children: React.ReactNode }
) {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const query = useSuspenseQuery({
    queryKey: ["users", userId as string, "user-info"], 
    queryFn: async () => {
      return await getUserInfo(parseInt(userId as string));
    }
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ["users", userId as string, "user-info"],
      });
    }
  }, []);

  return (
    <UserStoreContext.Provider value={UserStore}>
      <div className="my-[32px] flex flex-col items-stretch gap-[24px]">
        <h1 className="text-white text-[32px] font-bold">유저 프로필</h1>
        <UserHeader user={query.data} />
        <UserSectionOptions />
        {children}
      </div>
    </UserStoreContext.Provider>
  );
}