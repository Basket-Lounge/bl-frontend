'use client';

import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useStore } from 'zustand';
import { getMyInfo } from '@/api/user.api';
import { MyPageStoreContext } from '@/stores/myPage.stores';


export default function UserPage({ children }: { 
  children: React.ReactNode }
) {
  const queryClient = useQueryClient();
  const store = useContext(MyPageStoreContext);

  const setUsername = useStore(store, (state) => state.setUsername);
  const setPrevUsername = useStore(store, (state) => state.setPrevUsername);

  const setIntroduction = useStore(store, (state) => state.setIntroduction);
  const setPrevIntroduction = useStore(store, (state) => state.setPrevIntroduction);

  const setIsChatBlocked = useStore(store, (state) => state.setIsChatBlocked);
  const setPrevIsChatBlocked = useStore(store, (state) => state.setPrevIsChatBlocked);

  const setIsProfileVisible = useStore(store, (state) => state.setIsProfileVisible);
  const setPrevIsProfileVisible = useStore(store, (state) => state.setPrevIsProfileVisible);

  const userQuery = useSuspenseQuery({
    queryKey: ["my-page", "user-info"], 
    queryFn: async () => {
      return await getMyInfo();
    }
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ['my-page', 'user-info']
      });
    }
  }, []);

  useEffect(() => {
    if (userQuery.data) {
      setUsername(userQuery.data.username);
      setPrevUsername(userQuery.data.username);

      setIntroduction(userQuery.data.introduction);
      setPrevIntroduction(userQuery.data.introduction);

      setIsChatBlocked(userQuery.data.chat_blocked);
      setPrevIsChatBlocked(userQuery.data.chat_blocked);

      setIsProfileVisible(userQuery.data.is_profile_visible);
      setPrevIsProfileVisible(userQuery.data.is_profile_visible);

      return;
    }

  }, [userQuery.data]);

  return children;
}