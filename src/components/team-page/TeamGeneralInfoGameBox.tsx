import { Game, LineScore } from "@/models/game.models"
import TeamGeneralInfoGameBoxTeam from "./TeamGeneralInfoGameBoxTeam";
import { displayGameTimeForGameBox, displayLiveGameTimeForGameBox } from "@/utils/game.utils";


interface ITeamaGeneralInfoGameBoxProps {
  game: Game;
}

const TeamGeneralInfoGameBox : React.FC<ITeamaGeneralInfoGameBoxProps> = ({
  game
}) => {
  const awayTeamLineScore = game.visitor_team.linescore as LineScore;
  const homeTeamLineScore = game.home_team.linescore as LineScore;
  const currentGameTime = game.game_status_id == 1 ? displayGameTimeForGameBox(
    game.game_date_est,
  ) : displayLiveGameTimeForGameBox(game.game_status_id, game.live_period, game.live_pc_time);

  return (
    <div className="flex flex-col gap-[24px] items-stretch p-[24px] bg-color3 rounded-md w-1/4">
      {/* Away Team */}
      <TeamGeneralInfoGameBoxTeam 
        team={game.visitor_team} 
        lineScore={awayTeamLineScore} 
        gameStatusId={game.game_status_id} 
      />
      {/* Home Team */}
      <TeamGeneralInfoGameBoxTeam 
        team={game.home_team} 
        lineScore={homeTeamLineScore} 
        gameStatusId={game.game_status_id}
      />
      <div>
        <p className="text-center text-white w-fit mx-auto text-[16px]">
          {currentGameTime}
          {/* <span className="text-[16px]">4쿼터</span>
          <span className="text-[16px] mx-[6px]">|</span>
          <span className="text-[16px]">10:00</span> */}
        </p>
      </div>
      <div className="py-[8px] bg-color1 text-white font-bold text-[16px] rounded-full">
        <p className="text-center font-medium">상세 페이지</p>
      </div>
    </div>
  )
}

export default TeamGeneralInfoGameBox;