'use client'

import { getPlayersFromTeam } from "@/api/player.api";
import { Player } from "@/models/player.models";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CuteErrorMessage from "../common/CuteErrorMessage";


const TeamGeneralInfoSeasonBestPlayer = () => {
  const { teamId } = useParams();
  const [bestPlayer, setBestPlayer] = useState<Player | null>(null);

  const teamPlayersQuery = useQuery({
    queryKey: ["team", teamId, "players"],
    queryFn: async () => {
      return await getPlayersFromTeam(teamId as string);
    },
    staleTime: 86400000
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

  if (teamPlayersQuery.isLoading) {
    return (
      <div className="bg-color3 rounded-md h-[200px] animate-pulse" aria-label="loading-best-player" />
    )
  }

  if (teamPlayersQuery.isError || !bestPlayer) {
    return (
      <div 
        className="h-[200px] flex flex-col items-center justify-center gap-[16px]"
        aria-invalid="true"
        aria-errormessage="error-loading-best-player"
      >
        <CuteErrorMessage error="최고의 선수를 불러오는 중 오류가 발생했습니다." id="error-loading-best-player" />
      </div>
    )
  }

  return (
    <div className="rounded-md bg-color3 flex flex-col items-stretch gap-[24px] p-[24px]" aria-label="team-season-best-player">
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
        <div aria-label="player-season-stats">
          <h3 
            className="text-white text-[16px] lg:text-[20px] font-semibold"
            aria-label="player-name"
          >
            {bestPlayer!.first_name} {bestPlayer!.last_name}
          </h3>
          <div className="mt-[16px] flex gap-[32px]" aria-label="player-stats">
            <div className="flex flex-col gap-[8px] items-center" aria-label="player-points">
              <p className="text-white text-[14px] font-light">PTS</p>
              <p className="text-white text-[20px] font-medium">{bestPlayer!.pts?.toFixed(1) || '0.0'}</p>
            </div>
            <div className="flex flex-col gap-[8px] items-center" aria-label="player-assists">
              <p className="text-white text-[14px] font-light">AST</p>
              <p className="text-white text-[20px] font-medium">{bestPlayer!.ast?.toFixed(1) || '0.0'}</p>
            </div>
            <div className="flex flex-col gap-[8px] items-center" aria-label="player-rebounds">
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