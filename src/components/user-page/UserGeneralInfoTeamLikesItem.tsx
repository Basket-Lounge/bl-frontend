import { TeamNameSet } from "@/models/team.models";
import Image from "next/image";


interface IUserGeneralInfoTeamLikesItemProps {
  teamNameSet: TeamNameSet[];
  teamAbbreviation: string;
}


const UserGeneralInfoTeamLikesItem = (
  { teamNameSet, teamAbbreviation }: IUserGeneralInfoTeamLikesItemProps
) => {
  const teamName = teamNameSet.find((team) => team.language.name === "Korean")?.name || teamAbbreviation;

  return (
    <div
      className="px-[32px] py-[12px] text-[16px] font-medium rounded-full flex items-center gap-[24px] bg-color3 text-white"
    >
      <Image
        src={`/logos/${teamAbbreviation.toLowerCase()}.svg`}
        alt={teamName}
        width={24}
        height={24}
        className="w-[24px] h-[auto]"
      />
      {teamName}
    </div>
  );
}

export default UserGeneralInfoTeamLikesItem;