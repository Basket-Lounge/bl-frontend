import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllTeams } from "@/api/team.api";
import { useStore } from "zustand";
import AdminUsersFilterButtonOption from "../admin-page/AdminUsersFilterButtonOption";
import { AllGamesStoreContext } from "@/stores/games.stores";


const AllGamesTeamsFilterButtonOptionsContainer = () => {
  const allTeamsQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', "posts", "teams"],
    queryFn: async () => {
      return await getAllTeams();
    },
  });

  const queryKey = "teams";

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const store = useContext(AllGamesStoreContext);
  const setGamesParamsModified = useStore(store, (state) => state.setGamesParamsModified);

  const [status, setTeams] = useState<string[]>(searchParams.get(queryKey)?.split(',') || []);

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
      setTeams(oldTeams => status.filter((status) => status !== statusId))
    } else {
      setTeams(oldTeams => [...status, statusId])
    }
  }

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setGamesParamsModified(true);
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTeams([]);
  }

  if (allTeamsQuery.isLoading) {
    return (
      <div className="w-[350px] bg-color3 rounded-md p-[24px] z-30 flex gap-[16px] flex-wrap top-[150%] left-0">
        로딩중...
      </div>
    )
  }

  return (
    <div 
      className="w-full lg:w-[500px] bg-color3 rounded-md p-[24px] z-30 flex gap-[16px] flex-wrap top-[150%] left-0"
    >
      {allTeamsQuery.data?.map((team) => (
        <AdminUsersFilterButtonOption
          key={team.id}
          name={team.symbol}
          value={team.symbol}
          clicked={status.includes(team.symbol)}
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

export default AllGamesTeamsFilterButtonOptionsContainer;