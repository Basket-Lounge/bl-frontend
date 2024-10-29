import Image from "next/image";
import Link from "next/link";


interface ITeamPostsPaginationProps {
  currentPageNumber: number;
  previousLink: string;
  nextLink: string;
}

const TeamPostsPagination = ({
    previousLink, nextLink, currentPageNumber
}: ITeamPostsPaginationProps) => {
  return (
    <div className="">
      <div className="flex px-[24px] py-[16px] rounded-full bg-color3 w-fit mx-auto items-center gap-[24px]">
        {previousLink && (
        <Link
          href={previousLink}
        >
          <Image
            src="/icons/arrow_back_24dp.svg"
            alt="Previous"
            width={24}
            height={24}
          />
        </Link>
        )}
        <span className="rounded-full p-[6px] bg-color1">{currentPageNumber}</span>
        {nextLink && (
        <Link 
          href={nextLink}
        >
          <Image
            src="/icons/arrow_forward_24dp.svg"
            alt="Next"
            width={24}
            height={24}
          />
        </Link>
        )}
      </div>
    </div>
  );
}

export default TeamPostsPagination;