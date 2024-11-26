import { Player } from "@/models/player.models";
import Image from "next/image";

interface ISeasonTopPlayerProps {
  player: Player;
}

const SeasonTopPlayer = ({ player }: ISeasonTopPlayerProps) => {
  return (
    <div className="p-[24px] bg-color3 rounded-md flex flex-col gap-[16px]">
      {/* <div className="w-[36px] h-[36px] rounded-full relative bg-white">
        <p className="text-[20px] font-bold absolute top-[50%] right-[50%] -translate-y-[50%] translate-x-[50%] text-black">1</p>
      </div> */}
      <div className="w-[128px] h-[128px] rounded-full relative bg-white mx-auto overflow-hidden">
        <Image
          className="w-[100%] h-auto absolute bottom-0"
          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`}
          alt="player-image"
          width={128}
          height={128}
        />
      </div>
      <p className="text-[16px] font-semibold text-center">{player.first_name} {player.last_name}</p>
      <div className="flex items-center justify-between">
        <div className="text-center w-1/3">
          <p className="text-[14px] font-light">PTS</p>
          <p className="text-[24px] mt-[8px]">{player.pts || '0.0'}</p>
        </div>
        <div className="text-center w-1/3">
          <p className="text-[14px] font-light">AST</p>
          <p className="text-[24px] mt-[8px]">{player.ast || '0.0'}</p>
        </div>
        <div className="text-center w-1/3">
          <p className="text-[14px] font-light">REB</p>
          <p className="text-[24px] mt-[8px]">{player.reb || '0.0'}</p>
        </div>
      </div>
      <div className="w-full bg-color1 text-[16px] font-semibold py-[12px] text-center rounded-full">
        선수 상세보기 
      </div>
    </div>
  );
};

export default SeasonTopPlayer;