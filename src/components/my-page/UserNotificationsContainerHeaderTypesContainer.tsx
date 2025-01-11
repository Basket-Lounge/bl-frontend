import { useQuery } from "@tanstack/react-query";
import { getNotificationTypes } from "@/api/notification.api";
import UserNotificationsContainerHeaderTypeButton from "./UserNotificationsContainerHeaderTypeButton";
import SpinnerLoading from "../common/SpinnerLoading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useState } from "react";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useStore } from "zustand";
import SortButtonOption from "../common/SortButtonOption";


const UserNotificationsContainerHeaderTypesContainer = () => { 
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const types = searchParams.get('types') || '';
  const sort = searchParams.get('sort')?.split(',') || [];

  const createdAtIndex = sort.findIndex((value) => value === 'created_at' || value === '-created_at');
  const templateTypeIndex = sort.findIndex(
    (value) => value === 'template__type__name' || value === '-template__type__name'
  );

  const [createdAtSort, setCreatedAtSort] = useState<boolean | null>(
    createdAtIndex !== -1 ? (sort[createdAtIndex] === 'created_at' ? true : false) : null
  );
  const [typeSort, setTypeSort] = useState<boolean | null>(
    templateTypeIndex !== -1 ? 
      (sort[templateTypeIndex] === 'template__type__name' ? true : false) : null
  );

  const [currentTypes, setCurrentTypes] = useState<string[]>(types.split(','));

  const store = useContext(MyPageStoreContext);
  const setNotificationsArgumentsModified = useStore(store, (state) => state.setNotificationsArgumentsModified);

  const typesQuery = useQuery({
    queryKey: ['notifications', 'types'],
    queryFn: async () => {
      return await getNotificationTypes();
    }
  });

  const handleTypeSortClick = (sort: string) => {
    if (sort === 'asc') {
      setTypeSort(true);
    } else {
      setTypeSort(false);
    }
  }

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams()
    
    if (currentTypes.length === 0) {
      params.delete('types')
    } else {
      params.set('types', currentTypes.join(','))
    }

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
  }, [searchParams, typeSort, createdAtSort, currentTypes])

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNotificationsArgumentsModified(true);
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentTypes([]);
    setTypeSort(null);
  }

  const handleClick = useCallback((typeId: string) => {
    if (currentTypes.includes(typeId)) {
      setCurrentTypes(() => currentTypes.filter((type) => type !== typeId));
    } else {
      setCurrentTypes(() => [...currentTypes, typeId]);
    }
  }, [currentTypes]);

  if (typesQuery.isLoading || typesQuery.isRefetching) {
    return (
      <div 
        className="w-[300px] bg-color3 rounded-md p-[24px] border-none flex flex-wrap gap-[16px] items-stretch"
      >
        <SpinnerLoading />
      </div>
    )
  }

  if (typesQuery.isError) {
    return (
      <div 
        className="w-[300px] bg-color3 rounded-md p-[24px] border-none flex flex-wrap gap-[16px]"
      >
        <div className="text-white">로딩 중 에러가 발생했습니다.</div>
      </div>
    )
  }

  return (
    <div 
      className="w-full lg:w-[400px] bg-color3 rounded-md p-[24px] border-none gap-[24px] flex flex-col z-20"
    >
      <div className="flex flex-col gap-[16px] items-stretch">
        <h4 className="text-white text-[16px] font-semibold">정렬</h4>
        <div className="w-full flex flex-wrap gap-[16px]">
          {typesQuery.data!.map((type) => (
            <UserNotificationsContainerHeaderTypeButton 
              key={type.id}
              type={type}
              clicked={currentTypes.includes(type.id.toString())}
              onClick={handleClick}
            />
          ))}      
        </div>
      </div>
      <div className="flex flex-col gap-[16px] items-stretch">
        <h4 className="text-white text-[16px] font-semibold">알림 유형</h4>
        <SortButtonOption
          sortValue={handleTypeSortClick}
          currentValue={typeSort}
        />
      </div>
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

export default UserNotificationsContainerHeaderTypesContainer;