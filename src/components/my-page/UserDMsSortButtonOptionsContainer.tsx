import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useState } from "react";
import { useStore } from "zustand";
import SortButtonOption from "../common/SortButtonOption";
import { MyPageStoreContext } from "@/stores/myPage.stores";


const UserDMsSortButtonOptionsContainer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const sort = searchParams.get('sort')?.split(',') || [];

  const usernameIndex = sort.findIndex(
    (value) => value === 'userchatparticipant__user__username' || value === '-userchatparticipant__user__username'
  );
  const createdAtIndex = sort.findIndex((value) => value === 'created_at' || value === '-created_at');
  const updatedAtIndex = sort.findIndex((value) => value === 'updated_at' || value === '-updated_at');

  // if sort is empty, don't set any state
  // if the value is asc, set the state to true
  // if the value is desc, set the state to false
  const [usernameSort, setUsernameSort] = useState<boolean | null>(
    usernameIndex !== -1 ? (sort[usernameIndex] === 'userchatparticipant__user__username' ? true : false) : null
  );
  const [createdAtSort, setCreatedAtSort] = useState<boolean | null>(
    createdAtIndex !== -1 ? (sort[createdAtIndex] === 'created_at' ? true : false) : null
  );
  const [updatedAtSort, setUpdatedAtSort] = useState<boolean | null>(
    updatedAtIndex !== -1 ? (sort[updatedAtIndex] === 'updated_at' ? true : false) : null
  );

  const store = useContext(MyPageStoreContext);
  const setChatArgumentsModified = useStore(store, (state) => state.setChatArgumentsModified);


  const handleCreatedAtSortClick = (sort: string) => {
    if (sort === 'asc') {
      setCreatedAtSort(true);
    } else {
      setCreatedAtSort(false);
    }
  }

  const handleUpdatedAtSortClick = (sort: string) => {
    if (sort === 'asc') {
      setUpdatedAtSort(true);
    } else {
      setUpdatedAtSort(false);
    }
  }

  const handleUsernameSortClick = (sort: string) => {
    if (sort === 'asc') {
      setUsernameSort(true);
    } else {
      setUsernameSort(false);
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

    if (updatedAtSort !== null) {
      if (updatedAtSort) {
        newSorts.push('updated_at');
      } else {
        newSorts.push('-updated_at');
      }
    }

    if (usernameSort !== null) {
      if (usernameSort) {
        newSorts.push('userchatparticipant__user__username');
      } else {
        newSorts.push('-userchatparticipant__user__username');
      }
    }

    if (newSorts.length === 0) {
      params.delete('sort');
    } else {
      params.set('sort', newSorts.join(','));
    }

    params.set('page', '1')

    return params.toString()
  }, [searchParams, createdAtSort, updatedAtSort, usernameSort])

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setChatArgumentsModified(true);
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreatedAtSort(null);
    setUpdatedAtSort(null);
    setUsernameSort(null);
  }

  return (
    <div 
      className="absolute w-[350px] bg-color3 rounded-md p-[24px] z-10 flex flex-col gap-[16px] top-[150%] left-0"
    >
      <div className="flex flex-col gap-[16px]">
        <SortButtonOption
          name="유저 이름"
          sortValue={handleUsernameSortClick}
          currentValue={usernameSort}
        />
        <SortButtonOption
          name="생성 날짜"
          sortValue={handleCreatedAtSortClick}
          currentValue={createdAtSort}
        />
        <SortButtonOption
          name="업데이트 날짜"
          sortValue={handleUpdatedAtSortClick}
          currentValue={updatedAtSort}
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

export default UserDMsSortButtonOptionsContainer;