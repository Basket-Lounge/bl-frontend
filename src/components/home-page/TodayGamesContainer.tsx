'use client'

import { useQuery } from "@tanstack/react-query";
import { getTodayGames } from "@/api/game.api";
import TodayGamesListController from "./TodayGamesListController";
import TodayGameSkeletonsContainer from "./TodayGameSkeletonsContainer";
import CuteErrorMessage from "../common/CuteErrorMessage";


export default function TodayGamesContainer() {
  const todayGamesQuery = useQuery({
    queryKey: ["home", "today-games"],
    queryFn: () => getTodayGames()
  });

  if (todayGamesQuery.isLoading || todayGamesQuery.isRefetching) {
    return (
      <section>
        <h3 className="text-[20px] font-bold">오늘의 경기</h3>
        <TodayGameSkeletonsContainer />
      </section>
    );
  }

  if (todayGamesQuery.isError || todayGamesQuery.isRefetchError) {
    return (
      <section>
        <h3 className="text-[20px] font-bold">오늘의 경기</h3>
        <div className="h-[200px] flex flex-col gap-[16px] items-center justify-center">
          <CuteErrorMessage error="정보를 불러오는 중 오류가 발생했습니다." />
        </div>
      </section>
    );
  }

  if (todayGamesQuery.data!.length === 0 || todayGamesQuery.data === undefined) {
    return (
      <section>
        <h3 className="text-[20px] font-bold">오늘의 경기</h3>
        <div className="h-[200px] flex flex-col gap-[16px] items-center justify-center">
          <CuteErrorMessage error="오늘의 경기가 없습니다." />
        </div>
      </section>
    );
  }

  return (
    <section>
      <h3 className="text-[20px] font-bold">오늘의 경기</h3>
      <TodayGamesListController games={todayGamesQuery.data} />
    </section>
  );
}