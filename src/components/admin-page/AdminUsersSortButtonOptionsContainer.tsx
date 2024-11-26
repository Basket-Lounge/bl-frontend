import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useState } from "react";
import AdminUsersSortButtonOption from "./AdminUsersSortButtonOption";
import { AdminPageStoreContext } from "@/app/admin/layout";
import { useStore } from "zustand";


const AdminUsersSortButtonOptionsContainer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const sort = searchParams.get('sort')?.split(',') || [];

  const usernameIndex = sort.findIndex((value) => value === 'username' || value === '-username');
  const emailIndex = sort.findIndex((value) => value === 'email' || value === '-email');
  const createdAtIndex = sort.findIndex((value) => value === 'created_at' || value === '-created_at');

  // if sort is empty, don't set any state
  // if the value is asc, set the state to true
  // if the value is desc, set the state to false
  const [usernameSort, setUsernameSort] = useState<boolean | null>(
    usernameIndex !== -1 ? (sort[usernameIndex] === 'username' ? true : false) : null
  );
  const [emailSort, setEmailSort] = useState<boolean | null>(
    emailIndex !== -1 ? (sort[emailIndex] === 'email' ? true : false) : null
  );
  const [createdAtSort, setCreatedAtSort] = useState<boolean | null>(
    createdAtIndex !== -1 ? (sort[createdAtIndex] === 'created_at' ? true : false) : null
  );

  const store = useContext(AdminPageStoreContext);
  const setUserArgumentsModified = useStore(store, (state) => state.setUserArgumentsModified);

  const handleUsernameSortClick = (sort: string) => {
    if (sort === 'asc') {
      setUsernameSort(true);
    } else {
      setUsernameSort(false);
    }
  }

  const handleEmailSortClick = (sort: string) => {
    if (sort === 'asc') {
      setEmailSort(true);
    } else {
      setEmailSort(false);
    }
  }

  const handleCreatedAtSortClick = (sort: string) => {
    if (sort === 'asc') {
      setCreatedAtSort(true);
    } else {
      setCreatedAtSort(false);
    }
  }

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    
    const newSorts = [];
    if (usernameSort !== null) {
      if (usernameSort) {
        newSorts.push('username');
      } else {
        newSorts.push('-username');
      }
    }

    if (emailSort !== null) {
      if (emailSort) {
        newSorts.push('email');
      } else {
        newSorts.push('-email');
      }
    }

    if (createdAtSort !== null) {
      if (createdAtSort) {
        newSorts.push('created_at');
      } else {
        newSorts.push('-created_at');
      }
    }

    if (newSorts.length === 0) {
      params.delete('sort');
    } else {
      params.set('sort', newSorts.join(','));
    }

    params.set('page', '1')

    return params.toString()
  }, [searchParams, usernameSort, emailSort, createdAtSort])

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUserArgumentsModified(true);
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUsernameSort(null);
    setEmailSort(null);
    setCreatedAtSort(null);
    e.stopPropagation();
  }

  return (
    <div 
      className="absolute w-[350px] bg-color3 rounded-md p-[24px] z-10 flex flex-col gap-[16px] top-[150%] left-0"
    >
      <div className="flex flex-col gap-[16px]">
        <AdminUsersSortButtonOption
          name="아이디"
          sortValue={handleUsernameSortClick}
          currentValue={usernameSort}
        />
        <AdminUsersSortButtonOption
          name="이메일"
          sortValue={handleEmailSortClick}
          currentValue={emailSort}
        />
        <AdminUsersSortButtonOption
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

export default AdminUsersSortButtonOptionsContainer;