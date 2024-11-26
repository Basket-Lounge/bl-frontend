import { Game } from "@/models/game.models";
import { calculateTotalPoints } from "@/utils/game.utils";
import Image from "next/image";
import AllGamesContainerPerDateItem from "./AllGamesContainerPerDateItem";


interface IAllGamesContainerPerDateProps {
  date: string;
  games: Game[];
}

const AllGamesContainerPerDate = ({ date, games }: IAllGamesContainerPerDateProps) => {
  return (
    <div>
      <h3 className="text-[20px] font-semibold">{date}</h3>
      <div className="grid grid-cols-4 gap-[16px] w-full mt-[16px]">
        {games.map((game) => (
          <AllGamesContainerPerDateItem key={game.game_id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default AllGamesContainerPerDate;