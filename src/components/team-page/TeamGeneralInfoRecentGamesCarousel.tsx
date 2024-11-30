import { Game } from "@/models/game.models";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import { useCallback, useContext } from "react";
import { useStore } from "zustand";
import { Carousel } from "@material-tailwind/react";
import TeamGeneralInfoGameBox from "./TeamGeneralInfoGameBox";


interface ITeamGeneralInfoRecentGamesCarouselProps {
  games: Game[];
}

const TeamGeneralInfoRecentGamesCarousel = (
  { games }: ITeamGeneralInfoRecentGamesCarouselProps
) => {
  const store = useContext(pageSizeControllerStoreContext);
  const { pageWidth } = useStore(store);

  const divideGames = useCallback(() => {
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
      for (let i = 0; i < games.length; i += 4) {
        gamesLists.push(games.slice(i, i + 4));
      }
    }

    return gamesLists;
  }, [pageWidth, games]);

  return (
    <Carousel
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined}
      className="w-full"
      navigation={({ setActiveIndex, activeIndex, length }) => {
        if (activeIndex >= length) setActiveIndex(0);

        return (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
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
      {divideGames().map((games, index) => (
        <div key={index} className="grid gap-[16px] w-full grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
          {games.map((game) => (
            <TeamGeneralInfoGameBox 
              key={game.game_id} 
              game={game}
            />
          ))}
        </div>
      ))}
    </Carousel>
  )
}

export default TeamGeneralInfoRecentGamesCarousel;