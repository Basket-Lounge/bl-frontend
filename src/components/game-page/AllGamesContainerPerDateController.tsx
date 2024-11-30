import { Game } from "@/models/game.models";
import AllGamesContainerPerDateItem from "./AllGamesContainerPerDateItem";


interface IAllGamesContainerPerDateControllerProps {
  date: string;
  games: Game[];
}

const AllGamesContainerPerDateController = ({ date, games }: IAllGamesContainerPerDateControllerProps) => {
  return (
    <div>
      <h3 className="text-[20px] font-semibold">{date}</h3>
      <div className="grid gap-[16px] w-full mt-[16px] grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        {games.map((game) => (
          <AllGamesContainerPerDateItem key={game.game_id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default AllGamesContainerPerDateController;