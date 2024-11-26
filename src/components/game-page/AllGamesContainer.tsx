import { useQuery } from "@tanstack/react-query";
import AllGamesFilter from "./AllGamesFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AllGamesStoreContext } from "@/app/games/layout";
import { useStore } from "zustand";
import { useCallback, useContext, useEffect } from "react";
import { getGames } from "@/api/game.api";
import TeamPostsPagination from "../team-page/TeamPostsPagination";
import { sortGamesByDate } from "@/utils/game.utils";
import AllGamesContainerPerDate from "./AllGamesContainerPerDate";


const AllGamesContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const store = useContext(AllGamesStoreContext);
  const setGamesParamsModified = useStore(store, (state) => state.setGamesParamsModified);
  const gamesParamsModified = useStore(store, (state) => state.gamesParamsModified);

  const page = isNaN(parseInt(searchParams.get('page') || '1')) ? 
    1 : 
    parseInt(searchParams.get('page') || '1');

  const dateStart = searchParams.get('date-range-start') || '';
  const dateEnd = searchParams.get('date-range-end') || '';
  const teams = searchParams.get('teams') || '';

  const gamesQuery = useQuery({
    queryKey: ['games', 'pagination', page],
    queryFn: async () => {
      return await getGames(
        page,
        {
          dateStart,
          dateEnd,
          teams,
        }
      );
    }
  });

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setGamesParamsModified(true);
    router.push(pathname + "?" + createQueryString('page', newPage.toString()));  
  }

  useEffect(() => {
    if (gamesQuery.isRefetching) {
      return;
    }

    if (gamesParamsModified) {
      gamesQuery.refetch();
      setGamesParamsModified(false);
    }
  }, [dateStart, dateEnd, teams, page]);

  if (gamesQuery.isRefetching || gamesQuery.isLoading) {
    return (
      <div className="flex flex-col items-stretch gap-[16px]">
        <h3 className="text-[20px] font-bold">2024-25시즌 전체 스케쥴 📅</h3>
        <AllGamesFilter />
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-stretch gap-[16px]">
      <h3 className="text-[20px] font-bold">2024-25시즌 전체 스케쥴 📅</h3>
      <AllGamesFilter />
      {(gamesQuery.data) && (
        <div className="flex flex-col gap-[16px] items-stretch">
          {sortGamesByDate(gamesQuery.data.results).map((gamesPerDate, index) => (
            <AllGamesContainerPerDate 
              key={index} 
              date={gamesPerDate[0]} 
              games={gamesPerDate[1]} 
            />
          ))}
        </div>
      )}
      {(gamesQuery.data) && (
        <TeamPostsPagination 
          currentPageNumber={page}
          previousCallback={
            gamesQuery.data.previous ? () => handlePageChange(page - 1) : undefined
          }
          nextCallback={
            gamesQuery.data.next ? () => handlePageChange(page + 1) : undefined
          }
        />
      )}
    </div>
  )
}

export default AllGamesContainer;