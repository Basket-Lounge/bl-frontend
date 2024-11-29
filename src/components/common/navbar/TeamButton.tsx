import { TeamNameSet } from "@/models/team.models";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface ITeamButtonProps {
  teamNameSet: TeamNameSet[];
  teamAbbreviation: string;
  teamId: string;
}


const TeamButton = (
  { teamNameSet, teamAbbreviation, teamId}: ITeamButtonProps
) => {
  const router = useRouter();
  const teamName = teamNameSet.find((team) => team.language.name === "Korean")?.name || teamAbbreviation;
  const teamCity = teamName.split(" ")[0];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/teams/${teamId}/general-info`);
  }

  console.log(teamCity)

  return (
    <button 
      className={"px-[32px] py-[8px] text-[14px] font-medium rounded-full flex items-center gap-[24px] bg-color2 text-white"}
      onClick={handleClick}
    >
      <Image
        src={`/logos/${teamAbbreviation.toLowerCase()}.svg`}
        alt={teamName}
        width={24}
        height={24}
        className="w-[16px] h-[auto]"
      />
      {teamCity}
    </button>
  );
}

export default TeamButton;