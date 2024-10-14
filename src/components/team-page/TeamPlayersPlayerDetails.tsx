import { TeamStoreContext } from "@/app/teams/[teamId]/layout";
import { Player } from "@/models/player.models";
import { getPositionInKoreanFromAbbreviation } from "@/utils/player.utils";
import Image from "next/image";
import { useContext } from "react";
import { useStore } from "zustand";


interface ITeamPlayersPlayerDetailsProps {
  player: Player;
}

const TeamPlayersPlayerDetails : React.FC<ITeamPlayersPlayerDetailsProps> = ({ player }) => {
  const store = useContext(TeamStoreContext);
  const updateCurrentPlayerId = useStore(store, (state) => state.updateCurrentPlayerId);

  const handleGoBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateCurrentPlayerId(null);
  }

  const playerPosition = getPositionInKoreanFromAbbreviation(player.POSITION);

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <button className="text-white bg-color1 py-[12px] px-[32px] rounded-full w-fit" onClick={handleGoBackClick}>
        👈 선수 목록으로 돌아가기
      </button>
      <div className="flex gap-[48px] items-start">
        <div className="w-[128px] h-[128px] overflow-hidden bg-white rounded-full relative mx-auto">
          <Image
            className="w-[100%] h-auto absolute bottom-0"
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.PERSON_ID}.png`}
            alt="player-image"
            width={1040}
            height={760}
          />
        </div> 
        {/* Team Name */}
        <div className="flex flex-col gap-[16px] grow">
          <div className="flex items-center gap-[24px]">
            <h1 className="text-white text-[40px] font-medium">#{player.JERSEY_NUMBER}</h1>
            <div className="flex flex-col items-start gap-[4px]">
              <h1 className="text-white text-[24px]">{player.PLAYER_FIRST_NAME}</h1>
              <h1 className="text-white text-[24px] font-bold">{player.PLAYER_LAST_NAME}</h1>
            </div>
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="px-[32px] py-[4px] rounded-full bg-color3">
              <p className="text-[14px] text-white font-bold">{playerPosition}</p>
            </div>
            <div className="px-[32px] py-[4px] rounded-full bg-color3">
              <p className="text-[14px] text-white font-bold">{player.HEIGHT}</p>
            </div>
            <div className="px-[32px] py-[4px] rounded-full bg-color3">
              <p className="text-[14px] text-white font-bold">{player.WEIGHT} lbs</p>
            </div>
          </div>
        </div>
        <div className="bg-color3 rounded-lg text-[16px] p-[12px] font-medium flex gap-[12px]">
          <Image
            src={"/icons/favorite_border_24dp_FFFFFF.svg"}
            alt="favorite"
            width={24}
            height={24}
          />
          24
        </div>
      </div>
      <div>
        <h3 className="text-white text-[20px] font-bold">선수 정보</h3>
      </div>
    </div>
  )
}

export default TeamPlayersPlayerDetails;