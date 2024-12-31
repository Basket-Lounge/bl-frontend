'use client';

import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getAllRoles, getUser } from '@/api/admin.api';
import { useContext, useEffect } from 'react';
import { useStore } from 'zustand';
import { UserManagementStoreContext } from '@/stores/admin.stores';


export default function UserPage({ children }: { 
  children: React.ReactNode }
) {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const store = useContext(UserManagementStoreContext);

  const setUsername = useStore(store, (state) => state.setUsername);
  const setPrevUsername = useStore(store, (state) => state.setPrevUsername);

  const setRole = useStore(store, (state) => state.setRole);
  const setPrevRole = useStore(store, (state) => state.setPrevRole);

  const setIntroduction = useStore(store, (state) => state.setIntroduction);
  const setPrevIntroduction = useStore(store, (state) => state.setPrevIntroduction);

  const setIsChatBlocked = useStore(store, (state) => state.setIsChatBlocked);
  const setPrevIsChatBlocked = useStore(store, (state) => state.setPrevIsChatBlocked);

  const setIsProfileVisible = useStore(store, (state) => state.setIsProfileVisible);
  const setPrevIsProfileVisible = useStore(store, (state) => state.setPrevIsProfileVisible);

  const userQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', 'details', userId as string],
    queryFn: async () => {
      return await getUser(userId as string);
    }
  });

  useSuspenseQuery({
    queryKey: ['admin', 'users', 'roles'],
    queryFn: async () => {
      return await getAllRoles();
    }
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'users', 'details', userId as string]
      });
      queryClient.invalidateQueries({
        queryKey: ['admin', 'users', 'roles']
      });
    }
  }, []);

  useEffect(() => {
    if (userQuery.data) {
      setUsername(userQuery.data.username);
      setPrevUsername(userQuery.data.username);

      setRole(userQuery.data.role_data.id);
      setPrevRole(userQuery.data.role_data.id);

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