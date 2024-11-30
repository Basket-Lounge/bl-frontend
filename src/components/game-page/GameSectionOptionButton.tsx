import { TSection } from "@/models/game.models";
import { useParams, usePathname, useRouter } from "next/navigation";


interface IGameSectionOptionButtonProps {
  designatedSection: TSection;
  name: string;
};

export default function GameSectionOptionButton(
  { name, designatedSection }: IGameSectionOptionButtonProps
) {
  const router = useRouter();
  const {gameId} = useParams();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/games/${gameId}/${designatedSection}`);
  }

  return (
    <button
      className={pathname.includes(designatedSection) ? 
        "font-extrabold lg:text-[16px] text-[14px]" : 
        "font-medium lg:text-[16px] text-[14px]"
      }
      onClick={handleClick}
    >
      {name}
    </button>
  );
};