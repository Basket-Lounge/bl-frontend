import Image from "next/image";
import ImageButton from "./ImageButton";

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

  const handlePreviousClick = () => {
    if (previousCallback) {
      previousCallback();
    }
  }

  const handleNextClick = () => {
    if (nextCallback) {
      nextCallback();
    }
  }

  if (!previousCallback && !nextCallback) {
    return null;
  }

  return (
    <div className="flex w-fit mx-auto items-center gap-[24px] py-[12px] border border-white rounded-full px-[24px] my-[16px]">
      {(firstPageCallback && currentPageNumber !== 1) && (
        <ImageButton
          onClick={firstPageCallback}
          disabled={disabled}
          aria-label="first-page-button"
          aria-disabled={disabled}
        >
          <Image
            src="/icons/first_page_24dp_FFFFFF.svg"
            alt="First"
            width={24}
            height={24}
          />
        </ImageButton>
      )}
      {previousCallback && (
        <ImageButton
          onClick={handlePreviousClick}
          disabled={disabled}
          aria-label="previous-page-button"
          aria-disabled={disabled}
        >
          <Image
            src="/icons/arrow_back_24dp.svg"
            alt="Previous"
            width={24}
            height={24}
          />
        </ImageButton>
      )}
      <span 
        className="rounded-full text-white font-bold" 
        aria-label="current-page-number"
      >
        {currentPageNumber}
      </span>
      {nextCallback && (
        <ImageButton
          onClick={handleNextClick}
          disabled={disabled}
          aria-label="next-page-button"
          aria-disabled={disabled}
        >
          <Image
            src="/icons/arrow_forward_24dp.svg"
            alt="Next"
            width={24}
            height={24}
          />
        </ImageButton>
      )}
      {(lastPageCallback && currentPageNumber !== lastPageNumber) && (
        <ImageButton
          onClick={lastPageCallback}
          disabled={disabled}
          aria-label="last-page-button"
          aria-disabled={disabled}
        >
          <Image
            src="/icons/last_page_24dp_FFFFFF.svg"
            alt="Last"
            width={24}
            height={24}
          />
        </ImageButton>
      )}
    </div>
  );
}

export default Pagination;