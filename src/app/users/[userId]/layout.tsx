'use client';

import { getUserInfo } from '@/api/user.api';
import UserSectionOptions from '@/components/user-page/UserSectionOptions';
import UserHeader from '@/components/user-page/UserHeader';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {  useEffect } from 'react';
import { UserStore, UserStoreContext } from '@/stores/users.stores';


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