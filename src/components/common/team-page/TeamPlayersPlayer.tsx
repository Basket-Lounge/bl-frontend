import { TeamStoreContext } from "@/app/teams/[teamId]/layout";
import { Player } from "@/models/player.models";
import { getPositionInKoreanFromAbbreviation } from "@/utils/player.utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useStore } from "zustand";


interface ITeamPlayersPlayerProps {
  player: Player;
}

const TeamPlayersPlayer : React.FC<ITeamPlayersPlayerProps> = ({ player }) => {
  const router = useRouter();
  const store = useContext(TeamStoreContext);
  const updateCurrentPlayerId = useStore(store, (state) => state.updateCurrentPlayerId);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateCurrentPlayerId(player.PERSON_ID);
    router.push(`/teams/${player.TEAM_ID}/players/${player.PERSON_ID}`);
  }

  return (
    <div 
      className="flex flex-col gap-[24px] items-stretch p-[24px] rounded-md w-1/4 bg-color3"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="text-[20px]">
          <p>
            {player.PLAYER_FIRST_NAME}
          </p>
          <p className="mt-[4px] font-bold">
            {player.PLAYER_LAST_NAME}
          </p>
        </div>
        <div className="">
          <p className="text-[36px] text-center">
            {player.JERSEY_NUMBER || "-"}
          </p>
          <p className="text-center">
            {getPositionInKoreanFromAbbreviation(player.POSITION)}
          </p>
        </div>
      </div>
      <div>
        <div className="w-[128px] h-[128px] overflow-hidden bg-white rounded-full relative mx-auto">
          <Image
            className="w-[100%] h-auto absolute bottom-0"
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.PERSON_ID}.png`}
            alt="player-image"
            width={1040}
            height={760}
          />
        </div> 
      </div>
      <div className="mt-[16px] flex gap-[32px] w-[90%] justify-between mx-auto">
        <div className="flex flex-col gap-[8px] items-center">
          <p className="text-white text-[16px] font-light">PTS</p>
          <p className="text-white text-[24px] font-medium">{player.PTS || '0.0'}</p>
        </div>
        <div className="flex flex-col gap-[8px] items-center">
          <p className="text-white text-[16px] font-light">AST</p>
          <p className="text-white text-[24px] font-medium">{player.AST || '0.0'}</p>
        </div>
        <div className="flex flex-col gap-[8px] items-center">
          <p className="text-white text-[16px] font-light">REB</p>
          <p className="text-white text-[24px] font-medium">{player.REB || '0.0'}</p>
        </div>
      </div>
    </div>
  )
}

export default TeamPlayersPlayer;