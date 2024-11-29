'use client'

import { getGameGeneralInfo } from "@/api/game.api";
import GameHeader from "@/components/game-page/GameHeader";
import GameSectionOptions from "@/components/game-page/GameSectionOptions";
import { GameStore, GameStoreContext } from "@/stores/games.stores";
import { useSuspenseQuery } from "@tanstack/react-query";


export default function GamePage({ params, children }: {
  params: { gameId: string },
  children: React.ReactNode
}) {
  const headerQuery = useSuspenseQuery({
    queryKey: ["game", params.gameId],
    queryFn: async () => {
      console.log('game page query executed');
      return await getGameGeneralInfo(params.gameId);
    },
    refetchInterval: 30000
  });

  return (
    <GameStoreContext.Provider value={GameStore}>
      <div className="my-[32px] flex flex-col items-stretch gap-[24px]">
        <h1 className="text-white text-[32px] font-bold">게임 페이지</h1>
        <GameHeader game={headerQuery.data} />
        <GameSectionOptions />
        {children}
      </div>
    </GameStoreContext.Provider>
  );
}