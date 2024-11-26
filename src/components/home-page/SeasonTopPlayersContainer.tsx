import { Carousel } from "@material-tailwind/react";
import { Player } from "@/models/player.models";
import SeasonTopPlayer from "./SeasonTopPlayer";
import { useQuery } from "@tanstack/react-query";
import { getTop10PlayersThisSeason } from "@/api/player.api";
import SeasonTopPlayerSkeleton from "./SeasonTopPlayerSkeleton";


export default function SeasonTopPlayersContainer() {
  const top10PlayersQuery = useQuery({
    queryKey: ["home", "top-10-players"],
    queryFn: async () => {
      return await getTop10PlayersThisSeason();
    }
  });

  // divide the games into lists of 3
  const dividePlayers = (players: Player[]) => {
    const gamesLists = [];
    for (let i = 0; i < players.length; i += 4) {
      gamesLists.push(players.slice(i, i + 4));
    }

    return gamesLists;
  };

  if (top10PlayersQuery.isLoading || top10PlayersQuery.isRefetching) {
    return (
      <div>
        <h3 className="text-[20px] font-bold">2024-25시즌 TOP 10</h3>
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
      <h3 className="text-[20px] font-bold">2024-25시즌 TOP 10</h3>
      <Carousel 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
        className="mt-[16px] w-full"
      >
        {dividePlayers(top10PlayersQuery.data!).map((playersList, index) => (
          <div key={index} className="grid grid-cols-4 gap-[16px] mx-auto">
            {playersList.map((player, index) => (
              <SeasonTopPlayer
                key={index}
                player={player}
              />
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}