import { TSection } from "@/app/teams/[teamId]/layout";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";


interface ITeamSectionOptionButtonProps {
  designatedSection: TSection;
  name: string;
};

export default function TeamSectionOptionButton({ name, designatedSection }: ITeamSectionOptionButtonProps) {
  const {teamId} = useParams();
  const pathname = usePathname();

  return (
    <Link href={`/teams/${teamId}/${designatedSection}`}>
      <button
        className={pathname.includes(designatedSection) ? "font-extrabold text-[16px]" : "font-medium text-[16px]"}
      >
        {name}
      </button>
    </Link>
  );
};