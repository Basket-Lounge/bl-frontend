import Image from "next/image";
import TeamGeneralInfoSeasonBestPlayer from "./TeamGeneralInfoSeasonBestPlayer";
import TeamGeneralInfoSeasonStandings from "./TeamGeneralInfoSeasonStandings";
import TeamGeneralInfoRecentGames from "./TeamGeneralInfoRecentGames";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getLast4Games, getTeamFranchiseHistory, getTeamsStandings } from "@/api/team.api";
import { getPlayersFromTeam } from "@/api/player.api";
import TeamGeneralInfoFranchiseInfo from "./TeamGeneralInfoFranchiseInfo";


export default function TeamGeneralInfo() {
  const { teamId } = useParams();

  const teamPlayersQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "players"],
    queryFn: async () => {
      return await getPlayersFromTeam(teamId as string);
    }
  });

  const recentGamesQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "last-4-games"], 
    queryFn: async () => {
      return await getLast4Games(teamId as string);
    }
  });

  const standingsQuery = useSuspenseQuery({
    queryKey: ["team", "season-standings"],
    queryFn: async () => {
      return await getTeamsStandings();
    }
  });

  const franchiseHistoryQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "franchise-history"],
    queryFn: async () => {
      return await getTeamFranchiseHistory(teamId as string);
    }
  });

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <div>
        <h3 className="text-white text-[20px] font-bold">최근 4경기 결과</h3>
        <TeamGeneralInfoRecentGames games={recentGamesQuery.data} />
      </div>
      <div className="flex items-start gap-[32px]">
        <div className="grow flex flex-col gap-[24px] items-stretch">
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-white text-[20px] font-bold">24-25시즌 정보</h3>
            <TeamGeneralInfoSeasonStandings 
              conferenceStandings={standingsQuery.data}
            />
            <TeamGeneralInfoSeasonBestPlayer 
              players={teamPlayersQuery.data}
            />
          </div>
        </div>
        <div className="grow">
          <h3 className="text-white text-[20px] font-bold">최근 구단 관련 뉴스 / 소식 👀 </h3>
          <div className="mt-[16px] flex flex-col items-stretch gap-[16px]">
            <div className="p-[24px] rounded-md bg-color3">
              <h3 className="text-[16px] font-semibold">
                🏀 Atlanta Hawks, Trae Young이 부상으로 결장
              </h3>
              <div className="flex items-center gap-[16px] mt-[16px]">
                <div className="bg-white w-[32px] h-[32px] rounded-full">
                </div>
                <p className="text-[14px]">asdf1234</p>
                <p className="text-[14px]">2일전</p>
              </div>
              <div className="flex items-center gap-[24px] mt-[16px]"> 
                <div className="gap-[12px] flex items-center">
                  <Image
                    src="/icons/thumb_up_24dp.svg"
                    alt="like"
                    width={20}
                    height={20}
                  />
                  <p className="text-[16px]">
                    123
                  </p>
                </div>
                <div className="gap-[12px] flex items-center">
                  <Image
                    src="/icons/thumb_up_24dp.svg"
                    alt="like"
                    width={20}
                    height={20}
                  />
                  <p className="text-[16px]">
                    123
                  </p>
                </div>
              </div>
            </div>
            <div className="p-[24px] rounded-md bg-color3">
              <h3 className="text-[16px] font-semibold">
                🏀 Atlanta Hawks, Trae Young이 부상으로 결장
              </h3>
              <div className="flex items-center gap-[16px] mt-[16px]">
                <div className="bg-white w-[32px] h-[32px] rounded-full">
                </div>
                <p className="text-[14px]">asdf1234</p>
                <p className="text-[14px]">2일전</p>
              </div>
              <div className="flex items-center gap-[24px] mt-[16px]"> 
                <div className="gap-[12px] flex items-center">
                  <Image
                    src="/icons/thumb_up_24dp.svg"
                    alt="like"
                    width={20}
                    height={20}
                  />
                  <p className="text-[16px]">
                    123
                  </p>
                </div>
                <div className="gap-[12px] flex items-center">
                  <Image
                    src="/icons/thumb_up_24dp.svg"
                    alt="like"
                    width={20}
                    height={20}
                  />
                  <p className="text-[16px]">
                    123
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-white text-[20px] font-bold mt-[24px]">구단 정보</h3>
          <TeamGeneralInfoFranchiseInfo 
            franchiseHistory={franchiseHistoryQuery.data} 
          />
        </div>
      </div>
    </div>
  )
}