import Image from "next/image";


interface ITeamGeneralInfoSeasonStandingTeamProps {
  rank: number;
  teamId: number;
  teamName: string;
  symbol: string;
  wins: number;
  losses: number;
  currentPageTeam: boolean;
}

const TeamGeneralInfoSeasonStandingTeam: React.FC<ITeamGeneralInfoSeasonStandingTeamProps> = ({ 
    rank, 
    teamId, 
    teamName, 
    symbol,
    wins, 
    losses, 
    currentPageTeam 
}) => {
  const bgColor = currentPageTeam ? "bg-color4" : "bg-color1";
  return (
    <div className={"px-[24px] py-[16px] text-white flex gap-[24px] items-center " + bgColor}>
      <p className="text-[16px] font-bold">{rank}</p>
      <div className="bg-transparent w-[48px] h-[48px] rounded-full relative">
        <Image
          src={'/logos/' + symbol.toLowerCase() + '.svg'}
          alt="team-logo"
          width={20}
          height={20}
          className="w-auto h-[100%] absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
        />
      </div>
      <div>
        <p className="text-[16px] font-medium">{teamName}</p>
        <p className="text-[14px] font-light mt-[8px]">{wins} - {losses}</p>
      </div>
    </div>
  )
};

export default TeamGeneralInfoSeasonStandingTeam;