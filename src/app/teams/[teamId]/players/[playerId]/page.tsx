'use client'

import { getPlayerCareerStats, getPlayerLast5GamesStats, getPlayerSeasonStats, getPlayersFromTeam } from "@/api/player.api";
import { pageSizeControllerStoreContext } from "@/components/common/PageSizeController";
import TeamPlayersPlayerDetailsCareerStats from "@/components/team-page/TeamPlayersPlayerDetailsCareerStats";
import TeamPlayersPlayerDetailsExtraInfo from "@/components/team-page/TeamPlayersPlayerDetailsExtraInfo";
import TeamPlayersPlayerDetailsGameStats from "@/components/team-page/TeamPlayersPlayerDetailsGameStats";
import TeamPlayersPlayerDetailsSeasonStats from "@/components/team-page/TeamPlayersPlayerDetailsSeasonStats";
import { Player } from "@/models/player.models";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { useStore } from "zustand";


const TeamPlayersPlayerDetails = () => {
  const router = useRouter();
  const { teamId, playerId } = useParams<{ teamId: string, playerId: string }>();
  const teamPlayersQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "players"],
    queryFn: async () => {
      return await getPlayersFromTeam(teamId as string);
    },
    staleTime: 86400000
  });

  const playerSeasonStatsQuery = useQuery({
    queryKey: ["player", playerId, "season-stats"],
    queryFn: async () => {
      return await getPlayerSeasonStats(teamId, playerId);
    },
    staleTime: 86400000
  });

  const playerLast5GamesStatsQuery = useQuery({
    queryKey: ["player", playerId, "last-5-games-stats"],
    queryFn: async () => {
      return await getPlayerLast5GamesStats(teamId, playerId);
    }
  });

  const playerCareerStatsQuery = useQuery({
    queryKey: ["player", playerId, "career-stats"],
    queryFn: async () => {
      return await getPlayerCareerStats(teamId, playerId);
    },
    staleTime: 86400000
  });

  const store = useContext(pageSizeControllerStoreContext);
  const {
    pageWidth
  } = useStore(store);


  const selectedPlayer = teamPlayersQuery.data.find(player => player.id === Number(playerId)) as Player;

  const handleGoBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <section 
      className="flex flex-col gap-[24px] items-stretch"
      aria-label="player-details"
    >
      <button className="text-white bg-color1 py-[12px] px-[32px] rounded-full w-fit" onClick={handleGoBackClick}>
        👈 선수 목록으로 돌아가기
      </button>
      <div className="flex items-start justify-between overflow-x-auto gap-[48px]">
        <div className="flex gap-[48px] items-center lg:item-start shrink-0 grow">
          <div className="w-[128px] h-[128px] overflow-hidden bg-white relative rounded-full">
            <Image
              className="w-[100%] h-auto absolute bottom-0"
              src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${selectedPlayer.id}.png`}
              alt="player-image"
              width={1040}
              height={760}
            />
          </div> 
          {/* Team Name */}
          <div className="flex gap-[48px] w-min grow">
            <div className="flex items-center gap-[24px]">
              <h1 className="text-white text-[40px] font-medium">#{selectedPlayer.jersey_number || '-'}</h1>
              <div className="flex flex-col items-start gap-[4px]">
                <h1 className="text-white text-[24px]">{selectedPlayer.first_name}</h1>
                <h1 className="text-white text-[24px] font-bold">{selectedPlayer.last_name}</h1>
              </div>
            </div>
            {pageWidth > 768 && (
              <TeamPlayersPlayerDetailsExtraInfo player={selectedPlayer} />
            )}
          </div>
        </div>
      </div>
      {pageWidth <= 768 && (
        <TeamPlayersPlayerDetailsExtraInfo player={selectedPlayer} />
      )}
      <div>
        <h3 className="text-white text-[20px] font-bold">2024-25 시즌 스탯</h3>
        <TeamPlayersPlayerDetailsSeasonStats stats={playerSeasonStatsQuery.data} />
      </div>
      <div>
        <h3 className="text-white text-[20px] font-bold">지난 5경기 스탯</h3>
        <TeamPlayersPlayerDetailsGameStats stats={playerLast5GamesStatsQuery.data} />
      </div>
      <div>
        <h3 className="text-white text-[20px] font-bold">선수 커리어 스탯</h3>
        <TeamPlayersPlayerDetailsCareerStats stats={playerCareerStatsQuery.data} />
      </div>
    </section>
  )
}

export default TeamPlayersPlayerDetails;