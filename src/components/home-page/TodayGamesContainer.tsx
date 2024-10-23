import { Game } from "@/models/game.models";
import TodayGame from "./TodayGame";


export default function TodayGamesContainer({games}: {games: Game[]}) {
  return (
    <div className="mt-[16px] flex items-start gap-[32px]">
      {games.map((game) => (
        <TodayGame 
          key={game.game_id} 
          game={game}
        />
      ))}
    </div>
  );
}