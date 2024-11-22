import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useState } from "react";
import AdminUsersSortButtonOption from "./AdminUsersSortButtonOption";
import { useQueryClient } from "@tanstack/react-query";
import { AdminPageStoreContext } from "@/app/admin/layout";
import { useStore } from "zustand";


const AdminUsersDetailsPostsCommentsSortButtonOptionsContainer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const store = useContext(AdminPageStoreContext);
  const setCommentArgumentsModified = useStore(store, (state) => state.setCommentArgumentsModified);
  
  const sort = searchParams.get('sort')?.split(',') || [];
  const page = parseInt(searchParams.get('page') || '1');

  const createdAtIndex = sort.findIndex((value) => value === 'created_at' || value === '-created_at');
  const titleIndex = sort.findIndex((value) => value === 'post__title' || value === '-post__title');
  const teamsIndex = sort.findIndex((value) => value === 'post__team__symbol' || value === '-post__team__symbol');
  const statusIndex = sort.findIndex((value) => value === 'status__name' || value === '-status__name');

  // if sort is empty, don't set any state
  // if the value is asc, set the state to true
  // if the value is desc, set the state to false
  const [createdAtSort, setCreatedAtSort] = useState<boolean | null>(
    createdAtIndex !== -1 ? (sort[createdAtIndex] === 'created_at' ? true : false) : null
  );
  const [titleSort, setTitleSort] = useState<boolean | null>(
    titleIndex !== -1 ? (sort[titleIndex] === 'post__title' ? true : false) : null
  );
  const [teamsSort, setTeamsSort] = useState<boolean | null>(
    teamsIndex !== -1 ? (sort[teamsIndex] === 'post__team__symbol' ? true : false) : null
  );
  const [statusSort, setStatusSort] = useState<boolean | null>(
    statusIndex !== -1 ? (sort[statusIndex] === 'status__name' ? true : false) : null
  );

  const handleCreatedAtSortClick = (sort: string) => {
    if (sort === 'asc') {
      setCreatedAtSort(true);
    } else {
      setCreatedAtSort(false);
    }
  }

  const handleTitleSortClick = (sort: string) => {
    if (sort === 'asc') {
      setTitleSort(true);
    } else {
      setTitleSort(false);
    }
  }

  const handleTeamsSortClick = (sort: string) => {
    if (sort === 'asc') {
      setTeamsSort(true);
    } else {
      setTeamsSort(false);
    }
  }

  const handleStatusSortClick = (sort: string) => {
    if (sort === 'asc') {
      setStatusSort(true);
    } else {
      setStatusSort(false);
    }
  }

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    
    const newSorts = [];
    if (createdAtSort !== null) {
      if (createdAtSort) {
        newSorts.push('created_at');
      } else {
        newSorts.push('-created_at');
      }
    }

    if (titleSort !== null) {
      if (titleSort) {
        newSorts.push('post__title');
      } else {
        newSorts.push('-post__title');
      }
    }

    if (teamsSort !== null) {
      if (teamsSort) {
        newSorts.push('post__team__symbol');
      } else {
        newSorts.push('-post__team__symbol');
      }
    }

    if (statusSort !== null) {
      if (statusSort) {
        newSorts.push('status__name');
      } else {
        newSorts.push('-status__name');
      }
    }

    if (newSorts.length === 0) {
      params.delete('sort');
    } else {
      params.set('sort', newSorts.join(','));
    }

    return params.toString()
  }, [searchParams, createdAtSort, titleSort, teamsSort, statusSort]) 

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCommentArgumentsModified(true);
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreatedAtSort(null);
    setTitleSort(null);
    setTeamsSort(null);
    setStatusSort(null);
    e.stopPropagation();
  }

  return (
    <div 
      className="absolute w-[350px] bg-color3 rounded-md p-[24px] z-10 flex flex-col gap-[16px] top-[150%] left-0"
    >
      <div className="flex flex-col gap-[16px]">
        <AdminUsersSortButtonOption
          name="생성 날짜"
          sortValue={handleCreatedAtSortClick}
          currentValue={createdAtSort}
        />
        <AdminUsersSortButtonOption
          name="제목"
          sortValue={handleTitleSortClick}
          currentValue={titleSort}
        />
        <AdminUsersSortButtonOption
          name="팀"
          sortValue={handleTeamsSortClick}
          currentValue={teamsSort}
        />
        <AdminUsersSortButtonOption
          name="상태"
          sortValue={handleStatusSortClick}
          currentValue={statusSort}
        />
      </div>
      <div className="w-full flex justify-start gap-[16px] mt-[16px]">
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

export default AdminUsersDetailsPostsCommentsSortButtonOptionsContainer;