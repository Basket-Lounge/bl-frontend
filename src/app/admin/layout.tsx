'use client';

import { getMyInfo } from '@/api/user.api';
import AdminHeader from '@/components/admin-page/AdminHeader';
import AdminSectionOptions from '@/components/admin-page/AdminSectionOptions';
import Error403 from '@/components/common/error/Error403';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createContext, useEffect } from 'react';
import { createStore } from 'zustand';


interface IAdminPageStore {
  postsPaginationpage: number;
  setPostsPaginationPage: (page: number) => void;
  lastModifiedPostId: string | null;
  setLastModifiedPostId: (postId: string | null) => void;
}

const AdminPageStore = createStore<IAdminPageStore>((set) => ({
  postsPaginationpage: 1,
  setPostsPaginationPage: (page: number) => {
    if (page < 1) {
      return;
    }
    set({ postsPaginationpage: page })
  },
  lastModifiedPostId: null,
  setLastModifiedPostId: (postId: string | null) => {
    set({ lastModifiedPostId: postId });
  }
}));

export const AdminPageStoreContext = createContext(AdminPageStore);

export default function AdminPage({ children }: { 
  children: React.ReactNode }
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const query = useSuspenseQuery({
    queryKey: ["admin-page", "my-info"], 
    queryFn: async () => {
      return await getMyInfo();
    }
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-page", "my-info"],
        exact: true,
      });
    }
  }, []);

  const handleRedirectHomeClick = () => {
    router.push("/");
  }

  if (query.data.role_data.weight > 2) {
    return <Error403 reset={handleRedirectHomeClick} />;
  }

  return (
    <AdminPageStoreContext.Provider value={AdminPageStore}>
      <div className="my-[32px] flex flex-col items-stretch gap-[24px]">
        <h1 className="text-white text-[32px] font-bold">관리자 페이지</h1>
        <AdminHeader user={query.data} />
        <AdminSectionOptions />
        {children}
      </div>
    </AdminPageStoreContext.Provider>
  );
}