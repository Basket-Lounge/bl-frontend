import { Player } from "@/models/player.models";
import Image from "next/image";


interface ITeamGeneralInfoSeasonBestPlayerProps {
  players: Player[];
}

const TeamGeneralInfoSeasonBestPlayer : React.FC<ITeamGeneralInfoSeasonBestPlayerProps> = ({players}) => {
  const bestPlayer = players.reduce((player, cur) => {
    if (!player) return cur;
    return (player.pts || 0) > (cur.pts || 0) ? player : cur;
  });

  return (
    <div className="rounded-md bg-color3 flex flex-col items-stretch gap-[24px] p-[24px]">
      <p className="text-[16px] font-bold">이번 시즌 최고의 선수</p>
      <div className="flex items-center gap-[32px]">
        <div className="w-[96px] h-[96px] overflow-hidden bg-white rounded-full relative">
          <Image
            className="w-[100%] h-auto absolute bottom-0"
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${bestPlayer.id}.png`}
            alt="player-image"
            width={1040}
            height={760}
          />
        </div> 
        <div className="">
          <h3 className="text-white text-[20px] font-semibold">{bestPlayer.first_name} {bestPlayer.last_name}</h3>
          <div className="mt-[16px] flex gap-[32px]">
            <div className="flex flex-col gap-[8px] items-center">
              <p className="text-white text-[14px] font-light">PTS</p>
              <p className="text-white text-[20px] font-medium">{bestPlayer.pts?.toFixed(1) || '0.0'}</p>
            </div>
            <div className="flex flex-col gap-[8px] items-center">
              <p className="text-white text-[14px] font-light">AST</p>
              <p className="text-white text-[20px] font-medium">{bestPlayer.ast?.toFixed(1) || '0.0'}</p>
            </div>
            <div className="flex flex-col gap-[8px] items-center">
              <p className="text-white text-[14px] font-light">REB</p>
              <p className="text-white text-[20px] font-medium">{bestPlayer.reb?.toFixed(1) || '0.0'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamGeneralInfoSeasonBestPlayer;