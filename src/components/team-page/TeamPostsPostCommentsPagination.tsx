import { useContext } from "react";
import { PostCommentsContext } from "./TeamPostsPostCommentsContainer";
import { useStore } from "zustand";
import Image from "next/image";


interface ITeamPostsPostCommentsPagination {
  previous: number | null;
  currentPageNumber: number;
  next: number | null;
}

const TeamPostsPostCommentsPagination = (
  { previous, currentPageNumber, next }: ITeamPostsPostCommentsPagination
) => {
  const store = useContext(PostCommentsContext);
  const updatePage = useStore(store, (state) => state.updatePage);

  if (!previous && !next) {
    return null;
  }

  return (
    <div className="">
      <div className="flex px-[24px] py-[16px] rounded-full bg-color3 w-fit mx-auto items-center gap-[24px]">
        {previous && (
        <button
          onClick={() => updatePage(previous)}
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
        {next && (
        <button
          onClick={() => updatePage(next)}
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

export default TeamPostsPostCommentsPagination;