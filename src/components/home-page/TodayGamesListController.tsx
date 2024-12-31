import { Game } from "@/models/game.models";
import { useCallback, useContext } from "react";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import { useStore } from "zustand";
import { Carousel } from "@material-tailwind/react";
import TodayGame from "./TodayGame";


interface ITodayGamesListControllerProps {
  games: Game[];
}

export default function TodayGamesListController(
  { games }: ITodayGamesListControllerProps
) {
  const store = useContext(pageSizeControllerStoreContext);
  const { pageWidth } = useStore(store);

  // divide the games into lists of 3
  const divideGames = useCallback((games: Game[]) => {
    const gamesLists = [];
    if (pageWidth < 768) {
      for (let i = 0; i < games.length; i += 1) {
        gamesLists.push(games.slice(i, i + 1));
      }
    } else if (pageWidth < 1024) {
      for (let i = 0; i < games.length; i += 2) {
        gamesLists.push(games.slice(i, i + 2));
      }
    } else {
      for (let i = 0; i < games.length; i += 3) {
        gamesLists.push(games.slice(i, i + 3));
      }
    }

    return gamesLists;
  }, [pageWidth]);

  const className = pageWidth < 768 ? "grid grid-cols-1" : pageWidth < 1024 ? "grid grid-cols-2" : "grid grid-cols-3";

  return (
    <Carousel 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined}
      className="mt-[16px] w-full"
      navigation={({ setActiveIndex, activeIndex, length }) => {
        if (length === 1) return null;
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
      {divideGames(games).map((gamesList, index) => (
        <div key={index} className={"gap-[16px] mx-auto " + className}>
          {gamesList.map((game) => (
            <TodayGame
              key={game.game_id} 
              game={game}
            />
          ))}
        </div>
      ))}
    </Carousel>
  );
}