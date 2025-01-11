'use client'

import { useQuery } from "@tanstack/react-query";
import { getTop10PlayersThisSeason } from "@/api/player.api";
import SeasonTopPlayersListController from "./SeasonTopPlayersListController";
import SeasonTopPlayerSkeletonsContainer from "./SeasonTopPlayerSkeletonsContainer";
import CuteErrorMessage from "../common/CuteErrorMessage";


export default function SeasonTopPlayersContainer() {
  const top10PlayersQuery = useQuery({
    queryKey: ["home", "top-10-players"],
    queryFn: () => getTop10PlayersThisSeason()
  });

  if (top10PlayersQuery.isLoading || top10PlayersQuery.isRefetching) {
    return (
      <section>
        <h3 className="text-[20px] font-bold">2024-25 평균 득점 TOP 10</h3>
        <SeasonTopPlayerSkeletonsContainer />
      </section>
    );
  }

  if (
    top10PlayersQuery.isError || top10PlayersQuery.isRefetchError ||
    top10PlayersQuery.data === undefined || top10PlayersQuery.data!.length === 0
  ) {
    return (
      <section>
        <h3 className="text-[20px] font-bold">오늘의 경기</h3>
        <div className="h-[200px] flex flex-col gap-[16px] items-center justify-center">
          <CuteErrorMessage error="정보를 불러오는 중 오류가 발생했습니다." />
        </div>
      </section>
    );
  }

  return (
    <section>
      <h3 className="text-[20px] font-bold">2024-25 평균 득점 TOP 10</h3>
      <SeasonTopPlayersListController players={top10PlayersQuery.data!} />
    </section>
  );
}