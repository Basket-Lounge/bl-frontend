import { Game } from "@/models/game.models";
import AllGamesContainerPerDateItem from "./AllGamesContainerPerDateItem";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import { useContext } from "react";
import { useStore } from "zustand";


interface IAllGamesContainerPerDateProps {
  date: string;
  games: Game[];
}

const AllGamesContainerPerDate = ({ date, games }: IAllGamesContainerPerDateProps) => {
  const store = useContext(pageSizeControllerStoreContext)
  const { pageWidth } = useStore(store);

  const gridCols = pageWidth < 768 ? "grid-cols-1" : pageWidth < 1024 ? "grid-cols-2" : "grid-cols-4";

  return (
    <div>
      <h3 className="text-[20px] font-semibold">{date}</h3>
      <div className={"grid gap-[16px] w-full mt-[16px] " + gridCols}>
        {games.map((game) => (
          <AllGamesContainerPerDateItem key={game.game_id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default AllGamesContainerPerDate;