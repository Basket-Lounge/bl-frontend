import { getPlayersFromTeam } from "@/api/player.api";
import { Player } from "@/models/player.models";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const TeamGeneralInfoSeasonBestPlayer = () => {
  const { teamId } = useParams();
  const [bestPlayer, setBestPlayer] = useState<Player | null>(null);

  const teamPlayersQuery = useQuery({
    queryKey: ["team", teamId, "players"],
    queryFn: async () => {
      return await getPlayersFromTeam(teamId as string);
    }
  });

  const getBestPlayer = (players: Player[]) => {
    const bestPlayer = players.reduce((player, cur) => {
      if (!player) return cur;
      return (player.pts || 0) > (cur.pts || 0) ? player : cur;
    });

    return bestPlayer;
  }

  useEffect(() => {
    if (teamPlayersQuery.isSuccess) {
      setBestPlayer(getBestPlayer(teamPlayersQuery.data));
    }
  }, [teamPlayersQuery.data]);

  if (teamPlayersQuery.isLoading || teamPlayersQuery.isRefetching) {
    return (
      <div className="bg-color3 rounded-md h-[200px] animate-pulse" />
    )
  }

  if (teamPlayersQuery.isError || !bestPlayer) {
    return (
      <div className="bg-color3 rounded-md h-[200px] flex flex-col items-center justify-center text-white">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    )
  }

  return (
    <div className="rounded-md bg-color3 flex flex-col items-stretch gap-[24px] p-[24px]">
      <p className="text-[16px] font-bold">이번 시즌 최고의 선수</p>
      <div className="flex items-center gap-[32px]">
        <div className="w-[96px] h-[96px] overflow-hidden bg-white rounded-full relative">
          <Image
            className="w-[100%] h-auto absolute bottom-0"
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${bestPlayer!.id}.png`}
            alt="player-image"
            width={1040}
            height={760}
          />
        </div> 
        <div className="">
          <h3 className="text-white text-[20px] font-semibold">{bestPlayer!.first_name} {bestPlayer!.last_name}</h3>
          <div className="mt-[16px] flex gap-[32px]">
            <div className="flex flex-col gap-[8px] items-center">
              <p className="text-white text-[14px] font-light">PTS</p>
              <p className="text-white text-[20px] font-medium">{bestPlayer!.pts?.toFixed(1) || '0.0'}</p>
            </div>
            <div className="flex flex-col gap-[8px] items-center">
              <p className="text-white text-[14px] font-light">AST</p>
              <p className="text-white text-[20px] font-medium">{bestPlayer!.ast?.toFixed(1) || '0.0'}</p>
            </div>
            <div className="flex flex-col gap-[8px] items-center">
              <p className="text-white text-[14px] font-light">REB</p>
              <p className="text-white text-[20px] font-medium">{bestPlayer!.reb?.toFixed(1) || '0.0'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamGeneralInfoSeasonBestPlayer;