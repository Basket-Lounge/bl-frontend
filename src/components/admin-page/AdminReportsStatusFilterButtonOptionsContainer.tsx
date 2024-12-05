import { useCallback, useContext, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useStore } from "zustand";
import AdminReportsStatusFilterButtonOption from "./AdminReportsStatusFilterButtonOption";
import { AdminPageStoreContext } from "@/stores/admin.stores";


const AdminReportsStatusFilterButtonOptionsContainer = () => {
  const queryKey = "resolved";

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const store = useContext(AdminPageStoreContext);
  const setReportsArgumentsModified = useStore(store, (state) => state.setReportsArgumentsModified);

  const [status, setStatus] = useState<string>(searchParams.get(queryKey) || '');

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (status.length === 0) {
      params.delete(queryKey)
    } else {
      params.set(queryKey, status)
    }

    params.set('page', '1')

    return params.toString()
  }, [status, searchParams])

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReportsArgumentsModified(true);
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus('');
  }

  return (
    <div 
      className="w-[350px] bg-color3 rounded-md p-[24px] z-30 flex gap-[16px] flex-wrap top-[150%] left-0"
    >
      
      <AdminReportsStatusFilterButtonOption 
        name={"해결됨"}
        value={"1"}
        currentValue={status}
        handleFilterChange={(value: string) => setStatus(value)}
      />
      <AdminReportsStatusFilterButtonOption 
        name={"미해결"}
        value={"0"}
        currentValue={status}
        handleFilterChange={(value: string) => setStatus(value)}
      />
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

export default AdminReportsStatusFilterButtonOptionsContainer;