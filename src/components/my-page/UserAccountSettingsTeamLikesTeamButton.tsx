import { TeamNameSet } from "@/models/team.models";
import Image from "next/image";


interface IUserAccountSettingsTeamLikesTeamButtonProps {
  teamNameSet: TeamNameSet[];
  teamAbbreviation: string;
  liked: boolean;
  addToFavoriteCallback: (teamSymbol: string) => void;
  removeFromFavoriteCallback: (teamSymbol: string) => void;
}


const UserAccountSettingsTeamLikesTeamButton = (
  { teamNameSet, teamAbbreviation, liked, addToFavoriteCallback, removeFromFavoriteCallback }: IUserAccountSettingsTeamLikesTeamButtonProps
) => {
  const bgColor = liked ? "bg-white" : "bg-color2";
  const textColor = liked ? "text-color1" : "text-white";
  const teamName = teamNameSet.find((team) => team.language.name === "Korean")?.name || teamAbbreviation;

  return (
    <button 
      className={"px-[32px] py-[12px] text-[16px] font-medium rounded-full flex items-center gap-[24px] " + bgColor + " " + textColor}
      onClick={() => liked ? removeFromFavoriteCallback(teamAbbreviation) : addToFavoriteCallback(teamAbbreviation)}
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