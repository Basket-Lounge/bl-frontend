'use client'

import { getGameGeneralInfo } from "@/api/game.api";
import GameHeader from "@/components/game-page/GameHeader";
import GameSectionOptions from "@/components/game-page/GameSectionOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { createStore } from "zustand";


interface IGameStore {
  randomValue: string;
  setRandomValue: (value: string) => void;
}

export type TSection = "summary" | "box-score" | "play-by-play" | "live-chat";

const GameStore = createStore<IGameStore>((set) => ({
  randomValue: "0",
  setRandomValue: (value) => set({ randomValue: value }),
}));

export const GameStoreContext = createContext(GameStore);

export default function GamePage({ params, children }: {
  params: { gameId: string },
  children: React.ReactNode
}) {
  const headerQuery = useSuspenseQuery({
    queryKey: ["game", params.gameId],
    queryFn: async () => {
      return await getGameGeneralInfo(params.gameId);
    }
  });

  return (
    <GameStoreContext.Provider value={GameStore}>
      <div className="mx-[256px] my-[32px] flex flex-col items-stretch gap-[24px]">
        <h1 className="text-white text-[32px] font-bold">게임 페이지</h1>
        <GameHeader game={headerQuery.data} />
        <GameSectionOptions />
        {children}
      </div>
    </GameStoreContext.Provider>
  );
}