import { GameStoreContext } from "@/stores/games.stores";
import { PlayerStatistics } from "@/models/game.models";
import { useContext } from "react";
import { useStore } from "zustand";
import GameBoxScorePlayerStatsLine from "./GameBoxScorePlayerStatsLine";


const GameBoxScorePlayerStats = (
  { teamId, teamName, players }: { teamId: string, teamName: string, players: PlayerStatistics[] }
) => {
  const store = useContext(GameStoreContext);
  const currentBoxScoreTeamId = useStore(store, (state) => state.boxScoreTeamId);

  if (currentBoxScoreTeamId !== teamId && currentBoxScoreTeamId !== null) return null;
  return (
    <div className="flex flex-col gap-[16px] item-stretch">
      <h3 className="text-white text-[20px] font-bold">{teamName}</h3>
      <div
        className="p-[24px] bg-color3 rounded-md flex"
      >
        <div className="divide-y divide-white">
          <div className="py-[16px] text-[14px] lg:text-[16px]">
            <p className="w-[200px] font-semibold">선수 이름</p>
          </div>
          { players.length > 0 && players.map((player, index) => (
            <div className="py-[16px] flex">
              <p className="w-[200px] font-semibold">{player.player.first_name} {player.player.last_name}</p>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto w-[1330px] divide-y divide-white">
          <div className="py-[16px] w-[1330px] flex text-[14px] lg:text-[16px]">
            <p className="w-[70px] font-semibold text-right">MIN</p>
            <p className="w-[70px] font-semibold text-right">FGM</p>
            <p className="w-[70px] font-semibold text-right">FGA</p>
            <p className="w-[70px] font-semibold text-right">FG%</p>
            <p className="w-[70px] font-semibold text-right">3PM</p>
            <p className="w-[70px] font-semibold text-right">3PA</p>
            <p className="w-[70px] font-semibold text-right">3P%</p>
            <p className="w-[70px] font-semibold text-right">FTM</p>
            <p className="w-[70px] font-semibold text-right">FTA</p>
            <p className="w-[70px] font-semibold text-right">FT%</p>
            <p className="w-[70px] font-semibold text-right">OREB</p>
            <p className="w-[70px] font-semibold text-right">DREB</p>
            <p className="w-[70px] font-semibold text-right">REB</p>
            <p className="w-[70px] font-semibold text-right">AST</p>
            <p className="w-[70px] font-semibold text-right">STL</p>
            <p className="w-[70px] font-semibold text-right">BLK</p>
            <p className="w-[70px] font-semibold text-right">TO</p>
            <p className="w-[70px] font-semibold text-right">PF</p>
            <p className="w-[70px] font-semibold text-right">PTS</p>
            <p className="w-[70px] font-semibold text-right">+/-</p>
          </div>
          {players.map((player, index) => (
            <GameBoxScorePlayerStatsLine
              key={index}
              stats={player}
            />  
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameBoxScorePlayerStats;