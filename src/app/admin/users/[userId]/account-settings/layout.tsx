'use client';

import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getAllRoles, getUser } from '@/api/admin.api';
import { getAllTeams, getUserFavoriteTeams } from '@/api/team.api';
import { useContext, useEffect, useState } from 'react';
import { UserManagementStoreContext } from '../layout';
import { useStore } from 'zustand';


export default function UserPage({ children }: { 
  children: React.ReactNode }
) {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const store = useContext(UserManagementStoreContext);

  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(false);

  const setUsername = useStore(store, (state) => state.setUsername);
  const setPrevUsername = useStore(store, (state) => state.setPrevUsername);

  const setRole = useStore(store, (state) => state.setRole);
  const setPrevRole = useStore(store, (state) => state.setPrevRole);

  const setTeamLikes = useStore(store, (state) => state.setTeamLikes);
  const setPrevTeamLikes = useStore(store, (state) => state.setPrevTeamLikes);

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
    queryKey: ['admin', 'users', 'teams-info'],
    queryFn: async () => {
      return await getAllTeams();
    }
  });

  useSuspenseQuery({
    queryKey: ['admin', 'users', 'roles'],
    queryFn: async () => {
      return await getAllRoles();
    }
  });

  const userFavoriteTeamsQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', 'details', userId as string, 'favorite-teams'],
    queryFn: async () => {
      return await getUserFavoriteTeams(parseInt(userId as string));
    }
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'users', 'details', userId as string]
      });
    }
  }, []);

  useEffect(() => {
    if (userQuery.data) {
      setUsername(userQuery.data.username);
      setPrevUsername(userQuery.data.username);

      setRole(userQuery.data.role_data.id);
      setPrevRole(userQuery.data.role_data.id);

      setTeamLikes(userFavoriteTeamsQuery.data);
      setPrevTeamLikes(userFavoriteTeamsQuery.data);

      setIntroduction(userQuery.data.introduction);
      setPrevIntroduction(userQuery.data.introduction);

      setIsChatBlocked(userQuery.data.chat_blocked);
      setPrevIsChatBlocked(userQuery.data.chat_blocked);

      setIsProfileVisible(userQuery.data.is_profile_visible);
      setPrevIsProfileVisible(userQuery.data.is_profile_visible);

      setInitialized(true);
      return;
    }

    if (userQuery.error) {
      setError(true);
    }
  }, [userQuery.data, userFavoriteTeamsQuery.data]);

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return children;
}