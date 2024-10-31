import Image from "next/image";
import TeamPostsPostCommentsItemLikesButtonSpinner from "./TeamPostsPostCommentsItemLikesButtonSpinner";


interface ITeamPostsPostCommentsItemLikesRepliesButtonsContainerProps {
  likesCount: number;
  repliesCount: number;
  handleReplyButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleLikeButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isMutating: boolean;
  isLiked: boolean;
}


const TeamPostsPostCommentsItemLikesRepliesButtonsContainer = ({
  likesCount,
  repliesCount,
  handleReplyButtonClick,
  handleLikeButtonClick,
  isMutating,
  isLiked
}: ITeamPostsPostCommentsItemLikesRepliesButtonsContainerProps) => {
  return (
    <div className="flex items-center gap-[24px]">
      <button 
        className="flex gap-[16px] items-center"
        onClick={handleLikeButtonClick}
        disabled={isMutating}
      >
        {isLiked ? (
          <Image
            src="/icons/favorite_fill_24dp_FFFFFF.svg"
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
        ) : (
          <Image
            src="/icons/favorite_border_24dp_FFFFFF.svg"
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
        )}
        {isMutating ? (
          <TeamPostsPostCommentsItemLikesButtonSpinner />
        ) : (
          <span className="text-white">{likesCount}</span>
        )}
      </button>
      <button 
        className="flex gap-[16px] items-center"
        onClick={handleReplyButtonClick}
      >
        <Image
          src="/icons/comment_24dp_FFFFFF.svg"
          alt="avatar"
          width={20}
          height={20}
          className="rounded-full"
        />
        <span className="text-white">{repliesCount}</span>
      </button>
    </div>
  );
}

export default TeamPostsPostCommentsItemLikesRepliesButtonsContainer;