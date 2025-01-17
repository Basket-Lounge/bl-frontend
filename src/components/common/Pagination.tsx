import Image from "next/image";

interface IPaginationProps {
  currentPageNumber: number;
  lastPageNumber?: number;
  firstPageCallback?: () => void;
  previousCallback?: () => void;
  nextCallback?: () => void;
  lastPageCallback?: () => void;
  disabled?: boolean;
}

const Pagination = ({
  currentPageNumber,
  lastPageNumber,
  firstPageCallback,
  previousCallback,
  nextCallback,
  lastPageCallback,
  disabled
}: IPaginationProps) => {

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
        {(firstPageCallback && currentPageNumber !== 1) && (
        <button
          onClick={firstPageCallback}
          disabled={disabled}
        >
          <Image
            src="/icons/first_page_24dp_FFFFFF.svg"
            alt="First"
            width={24}
            height={24}
          />
        </button>
        )}
        {previousCallback && (
        <button
          onClick={handlePreviousClick}
          disabled={disabled}
        >
          <Image
            src="/icons/arrow_back_24dp.svg"
            alt="Previous"
            width={24}
            height={24}
          />
        </button>
        )}
        <span className="rounded-full p-[6px] bg-color1 text-white font-bold">{currentPageNumber}</span>
        {nextCallback && (
        <button
          onClick={handleNextClick}
          disabled={disabled}
        >
          <Image
            src="/icons/arrow_forward_24dp.svg"
            alt="Next"
            width={24}
            height={24}
          />
        </button>
        )}
        {(lastPageCallback && currentPageNumber !== lastPageNumber) && (
        <button
          onClick={lastPageCallback}
          disabled={disabled}
        >
          <Image
            src="/icons/last_page_24dp_FFFFFF.svg"
            alt="Last"
            width={24}
            height={24}
          />
        </button>
        )}
      </div>
    </div>
  );
}

export default Pagination;