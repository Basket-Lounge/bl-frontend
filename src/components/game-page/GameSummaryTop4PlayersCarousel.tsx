import GameSummaryTop4Player from "./GameSummaryTop4Player";
import { getTop4PlayersFromGame } from "@/utils/game.utils";
import { PlayerStatistics } from "@/models/game.models";
import { useCallback, useContext } from "react";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import { useStore } from "zustand";
import { Carousel } from "@material-tailwind/react";


interface IGameSummaryTop4PlayersCarouselProps {
  stats: PlayerStatistics[];
}

const GameSummaryTop4PlayersCarousel = (
  { stats }: IGameSummaryTop4PlayersCarouselProps
) => {
  const store = useContext(pageSizeControllerStoreContext);
  const { pageWidth } = useStore(store);

  const divideStats = useCallback((stats: PlayerStatistics[]) => {
    const statsLists = [];
    if (pageWidth < 1024) {
      for (let i = 0; i < stats.length; i += 2) {
        statsLists.push(stats.slice(i, i + 2));
      }
    } else {
      for (let i = 0; i < stats.length; i += 4) {
        statsLists.push(stats.slice(i, i + 4));
      }
    }

    return statsLists;
  }, [pageWidth]);

  const className = pageWidth < 1024 ? "grid grid-cols-2" : "grid grid-cols-4";

  return (
    <Carousel
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined}
      className="w-full"
      navigation={({ setActiveIndex, activeIndex, length }) => {
        if (activeIndex >= length) setActiveIndex(0);

        return (
          <div className="absolute bottom-4 left-2/4 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )
      }}
    >
      {divideStats(getTop4PlayersFromGame(stats)).map((statsList, index) => (
        <div key={index} className={"gap-[16px] mx-auto " + className}>
          {statsList.map((playerStat) => (
            <GameSummaryTop4Player 
              key={playerStat.player.id} 
              playerGameStat={playerStat} 
            />
          ))}
        </div>
      ))}
    </Carousel>
  )
}

export default GameSummaryTop4PlayersCarousel;