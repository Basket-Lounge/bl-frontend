import { useQuery } from "@tanstack/react-query";
import { getTop10PlayersThisSeason } from "@/api/player.api";
import SeasonTopPlayerSkeleton from "./SeasonTopPlayerSkeleton";
import SeasonTopPlayersListController from "./SeasonTopPlayersListController";


export default function SeasonTopPlayersContainer() {
  const top10PlayersQuery = useQuery({
    queryKey: ["home", "top-10-players"],
    queryFn: async () => {
      return await getTop10PlayersThisSeason();
    }
  });


  if (top10PlayersQuery.isLoading || top10PlayersQuery.isRefetching) {
    return (
      <div>
        <h3 className="text-[20px] font-bold">2024-25 평균 득점 TOP 10</h3>
        <div className="w-full gap-[16px] items-stretch grid grid-cols-4 animate-pulse mt-[16px]">
          <SeasonTopPlayerSkeleton />
          <SeasonTopPlayerSkeleton />
          <SeasonTopPlayerSkeleton />
          <SeasonTopPlayerSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-[20px] font-bold">2024-25 평균 득점 TOP 10</h3>
      <SeasonTopPlayersListController players={top10PlayersQuery.data!} />
    </div>
  );
}