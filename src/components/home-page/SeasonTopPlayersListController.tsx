import { useCallback, useContext } from "react";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import { useStore } from "zustand";
import { Carousel } from "@material-tailwind/react";
import { Player } from "@/models/player.models";
import SeasonTopPlayer from "./SeasonTopPlayer";


interface ISeasonTopPlayersListControllerProps {
  players: Player[];
}

export default function SeasonTopPlayersListController(
  { players }: ISeasonTopPlayersListControllerProps
) {
  const store = useContext(pageSizeControllerStoreContext);
  const { pageWidth } = useStore(store);

  const dividePlayers = useCallback((players: Player[]) => {
    const playersLists = [];
    if (pageWidth < 768) {
      for (let i = 0; i < players.length; i += 1) {
        playersLists.push(players.slice(i, i + 1));
      }
    } else if (pageWidth < 1024) {
      for (let i = 0; i < players.length; i += 2) {
        playersLists.push(players.slice(i, i + 2));
      }
    } else {
      for (let i = 0; i < players.length; i += 4) {
        playersLists.push(players.slice(i, i + 4));
      }
    }

    return playersLists;
  }, [pageWidth]);

  const className = pageWidth < 768 ? "grid grid-cols-1" : pageWidth < 1024 ? "grid grid-cols-2" : "grid grid-cols-4";

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
        {dividePlayers(players).map((playersList, index) => (
          <div key={index} className={"gap-[16px] mx-auto " + className}>
            {playersList.map((player, index) => (
              <SeasonTopPlayer
                key={index}
                player={player}
              />
            ))}
          </div>
        ))}
    </Carousel>
  );
}