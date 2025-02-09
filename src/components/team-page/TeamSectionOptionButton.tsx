import { TSection } from "@/models/team.models";
import { useParams, usePathname, useRouter } from "next/navigation";


interface ITeamSectionOptionButtonProps {
  designatedSection: TSection;
  name: string;
};

export default function TeamSectionOptionButton({ name, designatedSection }: ITeamSectionOptionButtonProps) {
  const router = useRouter();
  const {teamId} = useParams();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/teams/${teamId}/${designatedSection}`);
  }

  return (
    <button
      className={pathname.includes(designatedSection) ? "font-extrabold text-[16px]" : "font-medium text-[16px]"}
      onClick={handleClick}
      tabIndex={0}
    >
      {name}
    </button>
  );
};