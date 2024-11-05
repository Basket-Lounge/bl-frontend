'use client'

import { getMyChats } from "@/api/user.api";
import UserDMsChat from "@/components/my-page/UserDMsChat";
import UserDMsContainer from "@/components/my-page/UserDMsContainer";
import UserDMsFilter from "@/components/my-page/UserDMsFilter";
import TeamPostsPagination from "@/components/team-page/TeamPostsPagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";


const DMsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || '1');
  const userToChatWith = parseInt(searchParams.get("user") || '');

  const userChatsQuery = useSuspenseQuery({
    queryKey: ['my-page', "DMs", "pagination", page],
    queryFn: async () => {
      return await getMyChats(page);
    },
  });

  const handlePageChange = (newPage: number) => {
    router.push(pathname + `?page=${newPage}`);
  }

  const handleCloseChatClick = () => {
    router.push(pathname + `?page=${page}`);
  }

  console.log(userChatsQuery.data.results);

  const divClassName = isNaN(userToChatWith) ? 
    "flex flex-col items-stretch gap-[32px]" : "desktop-1:grid grid-cols-2 item-start gap-[32px]";

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <UserDMsFilter />
      <div className={divClassName}>
        <UserDMsContainer chats={userChatsQuery.data.results} />
        {isNaN(userToChatWith) ? null : (
          <Suspense fallback={<div>Loading...</div>}>
            <UserDMsChat userId={userToChatWith} closeChatCallback={handleCloseChatClick} />
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