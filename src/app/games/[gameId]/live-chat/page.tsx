'use client';

import { getGameGeneralInfo } from "@/api/game.api";
import { getConnectionToken, getSubscriptionToken } from "@/api/webSocket.api";
import GameLiveChatBox from "@/components/game-page/GameLiveChatBox";
import GameLiveChatPrediction from "@/components/game-page/GameLiveChatPrediction";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Centrifuge } from "centrifuge";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function LiveChatPage() {
  const { gameId } = useParams();

  const headerQuery = useSuspenseQuery({
    queryKey: ["game", gameId as string],
    queryFn: async () => {
      return await getGameGeneralInfo(gameId as string);
    },
  });

  return (
    <div className="flex flex-col gap-[32px] items-stretch">
      <GameLiveChatPrediction 
        homeTeam={headerQuery.data.home_team}
        awayTeam={headerQuery.data.visitor_team}
      />
      <GameLiveChatBox />
    </div>
  )
}