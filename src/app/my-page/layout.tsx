'use client';

import { getMyInfo } from '@/api/user.api';
import MyPageSectionOptions from '@/components/my-page/MyPageSectionOptions';
import UserHeader from '@/components/my-page/UserHeader';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useEffect } from 'react';
import { createStore } from 'zustand';


interface IMyPageStore {
}

export type TSection = "profile" | "posts" | "comments" | "dm";

const TeamStore = createStore<IMyPageStore>((set) => ({
}));

export const TeamStoreContext = createContext(TeamStore);

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
    <TeamStoreContext.Provider value={TeamStore}>
      <div className="mx-[256px] my-[32px] flex flex-col items-stretch gap-[24px]">
        <h1 className="text-white text-[32px] font-bold">계정 관리</h1>
        <UserHeader user={query.data} />
        <MyPageSectionOptions />
        {children}
      </div>
    </TeamStoreContext.Provider>
  );
}