import { Player } from "@/models/player.models";
import { getPositionInKoreanFromAbbreviation } from "@/utils/player.utils";


interface ITeamPlayersPlayerDetailsExtraInfoProps {
  player: Player;
}

const TeamPlayersPlayerDetailsExtraInfo = (
  { player }: ITeamPlayersPlayerDetailsExtraInfoProps
) => {
  const playerPosition = getPositionInKoreanFromAbbreviation(player.position);

  return (
    <div className="flex items-center gap-[16px] flex-wrap grow">
      <div className="px-[32px] py-[4px] rounded-full bg-color3">
        <p className="text-[14px] text-white font-bold">{playerPosition}</p>
      </div>
      {player.height && (
        <div className="px-[32px] py-[4px] rounded-full bg-color3">
          <p className="text-[14px] text-white font-bold">{player.height}</p>
        </div>
      )}
      {player.weight && (
        <div className="px-[32px] py-[4px] rounded-full bg-color3">
          <p className="text-[14px] text-white font-bold">{player.weight} lbs</p>
        </div>
      )}
      {player.country && (
        <div className="px-[32px] py-[4px] rounded-full bg-color3">
          <p className="text-[14px] text-white font-bold">{player.country}</p>
        </div>
      )}
      {player.college && (
        <div className="px-[32px] py-[4px] rounded-full bg-color3">
          <p className="text-[14px] text-white font-bold">{player.college}</p>
        </div>
      )}
      {player.draft_year && (
      <div className="px-[32px] py-[4px] rounded-full bg-color3">
        <p className="text-[14px] text-white font-bold">{player.draft_year}년 드래프트</p>
      </div>
      )}
      {player.draft_round && player.draft_number && (
      <div className="px-[32px] py-[4px] rounded-full bg-color3">
        <p className="text-[14px] text-white font-bold">{player.draft_round}라운드 {player.draft_number}순위 지명</p>
      </div>
      )}
    </div>
  )
}

export default TeamPlayersPlayerDetailsExtraInfo;