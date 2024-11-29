'use client';

import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getUser } from '@/api/admin.api';
import AdminUsersDetailsHeader from '@/components/admin-page/AdminUsersDetailsHeader';
import AdminUsersSectionOptions from '@/components/admin-page/AdminUsersSectionOptions';
import { UserManagementStore, UserManagementStoreContext } from '@/stores/admin.stores';


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