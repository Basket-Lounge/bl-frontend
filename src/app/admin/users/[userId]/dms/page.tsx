'use client'

import { getUserChat, getUserChats } from "@/api/admin.api";
import { AdminPageStoreContext } from "@/app/admin/layout";
import AdminUsersDetailsDMsChat from "@/components/admin-page/AdminUsersDetailsDMsChat";
import AdminUsersDetailsDMsContainer from "@/components/admin-page/AdminUsersDetailsDMsContainer";
import AdminUsersDetailsDMsFilter from "@/components/admin-page/AdminUsersDetailsDMsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useContext, useEffect } from "react";
import { useStore } from "zustand";


const DMsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { userId } = useParams();

  const store = useContext(AdminPageStoreContext);
  const lastModifiedChatId = useStore(store, (state) => state.lastModifiedChatId);
  const setLastModifiedChatId = useStore(store, (state) => state.setLastModifiedChatId);
  const chatArgumentsModified = useStore(store, (state) => state.chatArgumentsModified);
  const setChatArgumentsModified = useStore(store, (state) => state.setChatArgumentsModified);

  const page = parseInt(searchParams.get("page") || '1');
  const sort = searchParams.get("sort") || '';
  const search = searchParams.get("search") || '';
  const chatId = searchParams.get("chat") || '';

  const userChatsQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', userId as string, "DMs", "pagination", page],
    queryFn: async () => {
      return await getUserChats(
        parseInt(userId as string), 
        page, 
        { sort, search }
      );
    },
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const handlePageChange = (newPage: number) => {
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  const divClassName = !chatId ? 
    "flex flex-col items-stretch gap-[32px]" : "desktop-1:grid grid-cols-2 item-start gap-[32px]";

  useEffect(() => {
    if (lastModifiedChatId) {
      userChatsQuery.refetch();
      setLastModifiedChatId(null);
    }
  }, [lastModifiedChatId]);

  useEffect(() => {
    if (chatArgumentsModified) {
      userChatsQuery.refetch();
      setChatArgumentsModified(false);
    }
  }, [sort, search]);

  if (userChatsQuery.isLoading || userChatsQuery.isRefetching) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <AdminUsersDetailsDMsFilter />
      <div className={divClassName}>
        {userChatsQuery.isRefetching ? 
          <div>Loading...</div> :
          <AdminUsersDetailsDMsContainer chats={userChatsQuery.data.results} />
        }
        {!chatId ? null : (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsersDetailsDMsChat userId={parseInt(userId as string)} chatId={chatId} />
          </Suspense>
        )}
      </div>
      <TeamPostsPagination
        currentPageNumber={page}
        previousCallback={
          userChatsQuery.data.previous ? () => handlePageChange(page - 1) : undefined
        }
        nextCallback={
          userChatsQuery.data.next ? () => handlePageChange(page + 1) : undefined
        }
      />
    </div>
  );
}

export default DMsPage;