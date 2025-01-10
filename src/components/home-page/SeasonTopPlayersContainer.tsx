'use client'

import { useQuery } from "@tanstack/react-query";
import { getTop10PlayersThisSeason } from "@/api/player.api";
import SeasonTopPlayersListController from "./SeasonTopPlayersListController";
import SeasonTopPlayerSkeletonsContainer from "./SeasonTopPlayerSkeletonsContainer";
import { useEffect } from "react";


export default function SeasonTopPlayersContainer() {
  // const top10PlayersQuery = useQuery({
  //   queryKey: ["home", "top-10-players"],
  //   queryFn: async () => {
  //     return await getTop10PlayersThisSeason();
  //   }
  // });

  const top10PlayersQuery = useQuery({
    queryKey: ["home", "top-10-players"],
    queryFn: () => getTop10PlayersThisSeason()
  });

  console.log(top10PlayersQuery.data);

  if (top10PlayersQuery.isLoading || top10PlayersQuery.isRefetching) {
    return (
      <section>
        <h3 className="text-[20px] font-bold">2024-25 평균 득점 TOP 10</h3>
        <SeasonTopPlayerSkeletonsContainer />
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