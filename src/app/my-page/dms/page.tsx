'use client'

import { getMyChats } from "@/api/user.api";
import UserDMsChat from "@/components/my-page/UserDMsChat";
import UserDMsContainer from "@/components/my-page/UserDMsContainer";
import UserDMsFilter from "@/components/my-page/UserDMsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useContext, useEffect } from "react";
import { useStore } from "zustand";


const DMsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const store = useContext(MyPageStoreContext);
  const chatDeleted = useStore(store, (state) => state.chatDeleted);
  const setChatDeleted = useStore(store, (state) => state.setChatDeleted);
  const chatArgumentsModified = useStore(store, (state) => state.chatArgumentsModified);
  const setChatArgumentsModified = useStore(store, (state) => state.setChatArgumentsModified);

  const page = parseInt(searchParams.get("page") || '1');
  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';
  const userToChatWith = parseInt(searchParams.get("user") || '');

  const userChatsQuery = useQuery({
    queryKey: ['my-page', "DMs", "pagination", page],
    queryFn: async () => {
      return await getMyChats(page, { sort, search });
    },
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handlePageChange = (newPage: number) => {
    setChatArgumentsModified(true);
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  const divClassName = isNaN(userToChatWith) ? 
    "flex flex-col items-stretch gap-[32px]" : "desktop-1:grid grid-cols-2 item-start gap-[32px]";

  useEffect(() => {
    if (chatDeleted) {
      setChatDeleted(false);
      const userId = parseInt(searchParams.get("user") || '');
      router.push(pathname + '?' + createQueryString('user', ''));
      queryClient.removeQueries({
        queryKey: ['my-page', "DMs", "chat", userId]
      })
    }
  }, [userToChatWith, chatDeleted]);

  useEffect(() => {
    if (chatArgumentsModified) {
      userChatsQuery.refetch();
      setChatArgumentsModified(false);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <UserDMsFilter />
      <div className={divClassName}>
        {(userChatsQuery.isRefetching || userChatsQuery.isLoading) ?
          <div>Loading...</div> :
          <UserDMsContainer chats={userChatsQuery.data!.results} />
        }
        {isNaN(userToChatWith) ? null : (
          <Suspense fallback={<div>Loading...</div>}>
            <UserDMsChat userId={userToChatWith} />
          </Suspense>
        )}
      </div>
      {userChatsQuery.data && (
        <TeamPostsPagination
          currentPageNumber={page}
          previousCallback={
            userChatsQuery.data.previous ? () => handlePageChange(page - 1) : undefined
          }
          nextCallback={
            userChatsQuery.data.next ? () => handlePageChange(page + 1) : undefined
          }
        />
      )}
    </div>
  );
}

export default DMsPage;