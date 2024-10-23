import { TSection } from "@/app/games/[gameId]/layout";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";


interface IGameSectionOptionButtonProps {
  designatedSection: TSection;
  name: string;
};

export default function GameSectionOptionButton({ name, designatedSection }: IGameSectionOptionButtonProps) {
  const {gameId} = useParams();
  const pathname = usePathname();

  return (
    <Link href={`/games/${gameId}/${designatedSection}`}>
      <button
        className={pathname.includes(designatedSection) ? "font-extrabold text-[16px]" : "font-medium text-[16px]"}
      >
        {name}
      </button>
    </Link>
  );
};