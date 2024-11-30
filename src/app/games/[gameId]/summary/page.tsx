'use client'

import { getGameGeneralInfo } from "@/api/game.api";
import GameSummaryGeneralInfo from "@/components/game-page/GameSummaryGeneralInfo";
import GameSummaryLineScore from "@/components/game-page/GameSummaryLineScore";
import GameSummaryTeamStats from "@/components/game-page/GameSummaryTeamStats";
import GameSummaryTop4Players from "@/components/game-page/GameSummaryTop4Players";
import { useSuspenseQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation";


export default function SummaryPage() {
  const { gameId } = useParams();

  const headerQuery = useSuspenseQuery({
    queryKey: ["game", gameId as string],
    queryFn: async () => {
      return await getGameGeneralInfo(gameId as string);
    }
  });

  return (
    <div className="flex flex-col gap-[24px] lg:gap-[32px] items-stretch">
      { headerQuery.data.game_status_id > 1 && (
        <GameSummaryTop4Players />
      )}
      <div className="lg:flex gap-[32px]">
        { headerQuery.data.game_status_id > 1 && (
        <div className="lg:w-1/2">
          <GameSummaryLineScore
            homeTeam={headerQuery.data.home_team}
            awayTeam={headerQuery.data.visitor_team}
          />
          <GameSummaryTeamStats
            game={headerQuery.data}
          />
        </div>
        )}
        <div className="mt-[24px] lg:mt-0 lg:w-1/2">
          <GameSummaryGeneralInfo game={headerQuery.data} />
        </div>
      </div>
    </div>
  )
}