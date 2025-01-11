import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useState } from "react";
import { useStore } from "zustand";
import SortButtonOption from "../common/SortButtonOption";
import { MyPageStoreContext } from "@/stores/myPage.stores";


const UserNotificationsSortButtonOptionsContainer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const sort = searchParams.get('sort')?.split(',') || [];

  const createdAtIndex = sort.findIndex((value) => value === 'created_at' || value === '-created_at');
  const templateTypeIndex = sort.findIndex(
    (value) => value === 'template__type__name' || value === '-template__type__name'
  );

  // if sort is empty, don't set any state
  // if the value is asc, set the state to true
  // if the value is desc, set the state to false
  const [createdAtSort, setCreatedAtSort] = useState<boolean | null>(
    createdAtIndex !== -1 ? (sort[createdAtIndex] === 'created_at' ? true : false) : null
  );
  const [typeSort, setTypeSort] = useState<boolean | null>(
    templateTypeIndex !== -1 ? 
      (sort[templateTypeIndex] === 'template__type__name' ? true : false) : null
  );

  const store = useContext(MyPageStoreContext);
  const setNotificationsArgumentsModified = useStore(store, (state) => state.setNotificationsArgumentsModified);


  const handleCreatedAtSortClick = (sort: string) => {
    if (sort === 'asc') {
      setCreatedAtSort(true);
    } else {
      setCreatedAtSort(false);
    }
  }

  const handleTypeSortClick = (sort: string) => {
    if (sort === 'asc') {
      setTypeSort(true);
    } else {
      setTypeSort(false);
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

    if (typeSort !== null) {
      if (typeSort) {
        newSorts.push('template__type__name');
      } else {
        newSorts.push('-template__type__name');
      }
    }

    if (newSorts.length === 0) {
      params.delete('sort');
    } else {
      params.set('sort', newSorts.join(','));
    }

    params.set('page', '1')

    return params.toString()
  }, [searchParams, typeSort, createdAtSort])

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNotificationsArgumentsModified(true);
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTypeSort(null);
    setCreatedAtSort(null);
  }

  return (
    <div 
      className="w-[350px] bg-color3 rounded-md p-[24px] z-10 flex flex-col gap-[16px] top-[150%]"
    >
      <div className="flex flex-col gap-[16px]">
        <SortButtonOption
          name="알림 종류"
          sortValue={handleTypeSortClick}
          currentValue={typeSort}
        />
        <SortButtonOption
          name="생성 날짜"
          sortValue={handleCreatedAtSortClick}
          currentValue={createdAtSort}
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

export default UserNotificationsSortButtonOptionsContainer;