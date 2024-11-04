import Image from "next/image";

interface ITeamPostsPaginationProps {
  currentPageNumber: number;
  previousCallback?: () => void;
  nextCallback?: () => void;
}

const TeamPostsPagination = ({
  currentPageNumber,
  previousCallback,
  nextCallback,
}: ITeamPostsPaginationProps) => {

  const handlePreviousClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (previousCallback) {
      previousCallback();
    }
  }

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (nextCallback) {
      nextCallback();
    }
  }

  if (!previousCallback && !nextCallback) {
    return null;
  }

  return (
    <div className="">
      <div className="flex px-[24px] py-[16px] rounded-full bg-color3 w-fit mx-auto items-center gap-[24px]">
        {previousCallback && (
        <button
          onClick={handlePreviousClick}
        >
          <Image
            src="/icons/arrow_back_24dp.svg"
            alt="Previous"
            width={24}
            height={24}
          />
        </button>
        )}
        <span className="rounded-full p-[6px] bg-color1">{currentPageNumber}</span>
        {nextCallback && (
        <button
          onClick={handleNextClick}
        >
          <Image
            src="/icons/arrow_forward_24dp.svg"
            alt="Next"
            width={24}
            height={24}
          />
        </button>
        )}
      </div>
    </div>
  );
}

export default TeamPostsPagination;