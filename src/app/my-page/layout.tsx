'use client';

import { getMyInfo } from '@/api/user.api';
import MyPageSectionOptions from '@/components/my-page/MyPageSectionOptions';
import UserHeader from '@/components/my-page/UserHeader';
import { MyPageStore, MyPageStoreContext } from '@/stores/myPage.stores';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';


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