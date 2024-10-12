import TeamGeneralInfoGameBox from "./TeamGeneralInfoGameBox";
import { Game } from "@/models/game.models";


interface ITeamGeneralInfoRecentGamesProps {
  games: Game[];
}

const TeamGeneralInfoRecentGames : React.FC<ITeamGeneralInfoRecentGamesProps> = ({games}) => {
  return (
    <div className="mt-[16px] flex gap-[32px]">
      {/* 최근 4경기 결과 */}
      {games.map((game) => (
        <TeamGeneralInfoGameBox 
          key={game.game_id} 
          game={game}
        />
      ))}
    </div>
  )
}

export default TeamGeneralInfoRecentGames;