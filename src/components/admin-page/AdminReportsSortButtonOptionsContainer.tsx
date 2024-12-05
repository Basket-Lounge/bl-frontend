import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useState } from "react";
import { useStore } from "zustand";
import SortButtonOption from "../common/SortButtonOption";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { AdminPageStoreContext } from "@/stores/admin.stores";


const AdminReportsSortButtonOptionsContainer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const sort = searchParams.get('sort')?.split(',') || [];

  const titleIndex = sort.findIndex((value) => value === 'title' || value === '-title');
  const createdAtIndex = sort.findIndex((value) => value === 'created_at' || value === '-created_at');
  const updatedAtIndex = sort.findIndex((value) => value === 'updated_at' || value === '-updated_at');
  const resolvedIndex = sort.findIndex((value) => value === 'resolved' || value === '-resolved');

  // if sort is empty, don't set any state
  // if the value is asc, set the state to true
  // if the value is desc, set the state to false
  const [titleSort, setTitleSort] = useState<boolean | null>(
    titleIndex !== -1 ? (sort[titleIndex] === 'title' ? true : false) : null
  );
  const [createdAtSort, setCreatedAtSort] = useState<boolean | null>(
    createdAtIndex !== -1 ? (sort[createdAtIndex] === 'created_at' ? true : false) : null
  );
  const [updatedAtSort, setUpdatedAtSort] = useState<boolean | null>(
    updatedAtIndex !== -1 ? (sort[updatedAtIndex] === 'updated_at' ? true : false) : null
  );
  const [resolvedSort, setResolvedSort] = useState<boolean | null>(
    resolvedIndex !== -1 ? (sort[resolvedIndex] === 'resolved' ? true : false) : null
  );

  const store = useContext(AdminPageStoreContext);
  const setReportsArgumentsModified = useStore(store, (state) => state.setReportsArgumentsModified);

  const handletitleSortClick = (sort: string) => {
    if (sort === 'asc') {
      setTitleSort(true);
    } else {
      setTitleSort(false);
    }
  }

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

  const handleResolvedSortClick = (sort: string) => {
    if (sort === 'asc') {
      setResolvedSort(true);
    } else {
      setResolvedSort(false);
    }
  }

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    
    const newSorts = [];
    if (titleSort !== null) {
      if (titleSort) {
        newSorts.push('title');
      } else {
        newSorts.push('-title');
      }
    }

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

    if (resolvedSort !== null) {
      if (resolvedSort) {
        newSorts.push('resolved');
      } else {
        newSorts.push('-resolved');
      }
    }

    if (newSorts.length === 0) {
      params.delete('sort');
    } else {
      params.set('sort', newSorts.join(','));
    }

    params.set('page', '1')

    return params.toString()
  }, [searchParams, titleSort, createdAtSort])

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReportsArgumentsModified(true);
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitleSort(null);
    setCreatedAtSort(null);
    setUpdatedAtSort(null);
    setResolvedSort(null);
  }

  return (
    <div 
      className="absolute w-[350px] bg-color3 rounded-md p-[24px] z-10 flex flex-col gap-[16px] top-[150%] left-0"
    >
      <div className="flex flex-col gap-[16px]">
        <SortButtonOption
          name="제목"
          sortValue={handletitleSortClick}
          currentValue={titleSort}
        />
        <SortButtonOption
          name="생성 날짜"
          sortValue={handleCreatedAtSortClick}
          currentValue={createdAtSort}
        />
        <SortButtonOption
          name="수정 날짜"
          sortValue={handleUpdatedAtSortClick}
          currentValue={updatedAtSort}
        />
        <SortButtonOption
          name="해결 여부"
          sortValue={handleResolvedSortClick}
          currentValue={resolvedSort}
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

export default AdminReportsSortButtonOptionsContainer;