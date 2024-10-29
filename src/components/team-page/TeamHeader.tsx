import { Team } from "@/models/team.models";
import { extractTeamEnglishName, extractTeamKoreanName } from "@/utils/team.utils";
import Image from "next/image";


interface ITeamHeaderProps {
  team: Team;
}

export default function TeamHeader({ team }: ITeamHeaderProps) {
  const EnglishName = extractTeamEnglishName(team);
  const KoreanName = extractTeamKoreanName(team);
  const leagueRank = team.stats?.PlayoffRank || 0;
  const wins = team.stats?.WINS || 0;
  const losses = team.stats?.LOSSES || 0;

  return (
    <div className="flex gap-[48px] items-start">
      {/* Team Logo */}
      <div className="w-[156px] h-[156px] rounded-full bg-white relative">
        <Image
          className="w-auto h-[70%] absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
          src={'/logos/' + team.symbol.toLowerCase() + '.svg'}
          alt="team-logo"
          width={20}
          height={20}
        />
      </div>
      {/* Team Name */}
      <div className="flex flex-col gap-[16px] grow">
        <div className="flex flex-col items-start gap-[8px]">
          <h3 className="text-white text-[24px] font-medium">The Home of</h3>
          <h1 className="text-white text-[32px] font-bold">{EnglishName}</h1>
          <h3 className="text-white text-[24px] font-medium">{KoreanName}</h3>
        </div>
        <div className="flex items-center gap-[24px]">
          <div className="px-[32px] py-[4px] rounded-full bg-white">
            <p className="text-[14px] text-color1 font-bold">지구 {leagueRank}위</p>
          </div>
          <div className="px-[32px] py-[4px] rounded-full bg-white">
            <p className="text-[14px] text-color1 font-bold">{wins} - {losses}</p>
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
  )
}