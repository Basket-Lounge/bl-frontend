'use client';

import { extractTeamEnglishName, extractTeamKoreanName } from "@/utils/team.utils";
import Image from "next/image";
import TeamHeaderLikeButton from "./TeamHeaderLikeButton";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTeamGeneralInfo } from "@/api/team.api";


export default function TeamHeader() {
  const { teamId } = useParams<{ teamId: string }>();
  const headerQuery = useSuspenseQuery({
    queryKey: ["team", teamId],
    queryFn: async () => {
      return await getTeamGeneralInfo(teamId);
    }
  });

  const EnglishName = extractTeamEnglishName(headerQuery.data);
  const KoreanName = extractTeamKoreanName(headerQuery.data);
  const leagueRank = headerQuery.data.stats?.PlayoffRank || 0;
  const wins = headerQuery.data.stats?.WINS || 0;
  const losses = headerQuery.data.stats?.LOSSES || 0;

  return (
    <div className="flex gap-[24px] lg:gap-[48px] items-start">
      {/* Team Logo */}
      <div className="w-[128px] h-[128px] lg:w-[156px] lg:h-[156px] rounded-full relative">
        <Image
          className="w-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
          src={'/logos/' + headerQuery.data.symbol.toLowerCase() + '.svg'}
          alt="team-logo"
          width={20}
          height={20}
        />
      </div>
      {/* Team Name */}
      <div className="flex flex-col gap-[16px] grow">
        <div className="flex flex-col items-start gap-[8px]">
          <h3 className="text-white text-[20px] lg:text-[24px] font-medium">The Home of</h3>
          <h1 className="text-white text-[24px] lg:text-[32px] font-bold">{EnglishName}</h1>
          <h3 className="text-white text-[20px] lg:text-[24px] font-medium">{KoreanName}</h3>
        </div>
        <div className="flex items-center gap-[16px] lg:gap-[24px] flex-wrap">
          <div className="px-[32px] py-[4px] rounded-full bg-white">
            <p className="text-[14px] text-color1 font-bold">지구 {leagueRank}위</p>
          </div>
          <div className="px-[32px] py-[4px] rounded-full bg-white">
            <p className="text-[14px] text-color1 font-bold">{wins} - {losses}</p>
          </div>
        </div>
      </div>
      <TeamHeaderLikeButton liked={headerQuery.data.liked || false} likesCount={headerQuery.data.likes_count} />
    </div>
  )
}