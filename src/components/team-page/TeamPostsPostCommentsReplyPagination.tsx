import Image from "next/image";


interface ITeamPostsPostCommentsReplyPaginationProps {
  currentPageNumber: number;
  previousLink: string;
  nextLink: string;
  setPageNumber: (pageNumber: number) => void;
}

const TeamPostsPostCommentsReplyPagination = ({
    previousLink, nextLink, currentPageNumber, setPageNumber 
}: ITeamPostsPostCommentsReplyPaginationProps) => {

  if (!previousLink && !nextLink) {
    return null;
  }

  const handlePreviousClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPageNumber(currentPageNumber - 1);
  }

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPageNumber(currentPageNumber + 1);
  }

  return (
    <div className="">
      <div className="flex px-[24px] py-[16px] rounded-full bg-color3 w-fit mx-auto items-center gap-[24px]">
        {previousLink && (
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
        {nextLink && (
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

export default TeamPostsPostCommentsReplyPagination;