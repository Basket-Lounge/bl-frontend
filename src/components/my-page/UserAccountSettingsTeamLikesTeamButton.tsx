import { TeamNameSet } from "@/models/team.models";
import Image from "next/image";


interface IUserAccountSettingsTeamLikesTeamButtonProps {
  teamNameSet: TeamNameSet[];
  teamAbbreviation: string;
  clickCallback: (teamSymbol: string) => void;
  liked?: boolean;
  favorite?: boolean;
}


const UserAccountSettingsTeamLikesTeamButton = ({ 
  teamNameSet, 
  teamAbbreviation, 
  liked, 
  clickCallback,
  favorite
}: IUserAccountSettingsTeamLikesTeamButtonProps) => {
  const bgColor = liked ? (favorite ? "bg-[#16A34A]" : "bg-white") : "bg-color2";
  const textColor = liked ? (favorite ? "text-white" : "text-color1") : "text-white";
  const teamName = teamNameSet.find((team) => team.language.name === "Korean")?.name || teamAbbreviation;

  return (
    <button 
      className={"px-[32px] py-[12px] text-[16px] font-medium rounded-full flex items-center gap-[24px] " + bgColor + " " + textColor}
      onClick={() => clickCallback(teamAbbreviation)}
    >
      <Image
        src={`/logos/${teamAbbreviation.toLowerCase()}.svg`}
        alt={teamName}
        width={24}
        height={24}
        className="w-[24px] h-[auto]"
      />
      {teamName}
    </button>
  );
}

export default UserAccountSettingsTeamLikesTeamButton;