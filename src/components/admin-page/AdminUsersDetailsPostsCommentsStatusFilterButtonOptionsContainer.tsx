import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import AdminUsersFilterButtonOption from "./AdminUsersFilterButtonOption";
import { getTeamPostCommentStatus } from "@/api/team.api";
import { extractPostCommentStatusKoreanName } from "@/utils/admin.utils";
import { AdminPageStoreContext } from "@/app/admin/layout";
import { useStore } from "zustand";


const AdminUsersDetailsPostsCommentsStatusFilterButtonOptionsContainer = () => {
  const teamPostStatusesQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', "comments", "statuses"],
    queryFn: async () => {
      return await getTeamPostCommentStatus();
    },
  });

  const queryKey = "status";

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const store = useContext(AdminPageStoreContext);
  const setCommentArgumentsModified = useStore(store, (state) => state.setCommentArgumentsModified);

  const [status, setStatus] = useState<string[]>(searchParams.get(queryKey)?.split(',') || []);

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (status.length === 0) {
      params.delete(queryKey)
    } else {
      params.set(queryKey, status.join(','))
    }

    params.set('page', '1')

    return params.toString()
  }, [status, searchParams])

  const handleRoleClick = (statusId: string) => {
    if (status.includes(statusId)) {
      setStatus(oldStatus => status.filter((status) => status !== statusId))
    } else {
      setStatus(oldStatus => [...status, statusId])
    }
  }

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCommentArgumentsModified(true);
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus([]);
    e.stopPropagation();
  }

  if (teamPostStatusesQuery.isLoading) {
    return (
      <div className="absolute w-[350px] bg-color3 rounded-md p-[24px] z-10 flex gap-[16px] flex-wrap top-[150%] left-0">
        로딩중...
      </div>
    )
  }

  return (
    <div 
      className="absolute w-[350px] bg-color3 rounded-md p-[24px] z-10 flex gap-[16px] flex-wrap top-[150%] left-0"
    >
      {teamPostStatusesQuery.data?.map((status_data) => (
        <AdminUsersFilterButtonOption
          key={status_data.id}
          name={extractPostCommentStatusKoreanName(status_data)}
          value={status_data.id.toString()}
          clicked={status.includes(status_data.id.toString())}
          handleClick={handleRoleClick}
        />
      ))}
      <div className="w-full flex justify-start mt-[16px] gap-[16px]">
        <button
          className="bg-color4 text-white px-[12px] py-[8px] rounded-full w-full"
          onClick={handleResetClick}
        >
          초기화
        </button>
        <button
          className="bg-color4 text-white px-[12px] py-[8px] rounded-full w-full"
          onClick={handleApplyClick}
        >
          적용
        </button>
      </div>
    </div>
  )
}

export default AdminUsersDetailsPostsCommentsStatusFilterButtonOptionsContainer;