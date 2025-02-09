import { TeamPostCommentReply } from "@/models/team.models";
import { timeAgoKorean } from "@/utils/common.utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import DropdownButton from "../common/DropdownButton";
import TeamPostsPostCommentsReplyReaderOptions from "./TeamPostsPostCommentsReplyReaderOptions";
import { useAuthStore } from "@/stores/auth.stores";
import TeamPostsPostCommentsReplyAuthorOptions from "./TeamPostsPostCommentsReplyAuthorOptions";


interface ITeamPostsPostCommentsReplyProps {
  reply: TeamPostCommentReply;
  commentId: string;
}

const TeamPostsPostCommentsReply = ({reply, commentId}: ITeamPostsPostCommentsReplyProps) => {
  const userFavTeamSymbol = reply.user_data.favorite_team?.symbol;
  const userFavTeamId = reply.user_data.favorite_team?.id;

  const createdAtInKorean = timeAgoKorean(reply.created_at);

  const { teamId, postId } = useParams<{ teamId: string, postId: string }>();
  const router = useRouter();

  const {
    isAuthenticated,
    userId
  } = useAuthStore();

  const handleTeamClick = () => {
    if (userFavTeamId === null) return
    router.push("/teams/" + userFavTeamId + "/general-info");
  }

  const handleTeamKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleTeamClick();
    }
  }

  const handleUserClick = () => {
    router.push("/users/" + reply.user_data.id + "/general-info");
  }

  const handleUserKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleUserClick();
    }
  }

  return (
    <li className="flex flex-col items-stretch gap-[24px] px-[24px] py-[16px]" aria-label="team-post-comment-reply">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[32px]">
          <div className="flex items-center gap-[16px]">
            {userFavTeamSymbol == null ? (
              <div 
                className="w-[32px] h-[32px] overflow-hidden rounded-full relative bg-white"
                aria-label="user-info"
                role="button"
                tabIndex={0}
                onClick={handleUserClick}
                onKeyDown={handleUserKeyDown}
              >
                <div 
                  className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[16px] xl:text-[20px] text-color1"
                  aria-label="user-username-initial"
                >
                  {reply.user_data.username.slice(0, 1) || 'U'}
                </div>
              </div>
            ) : (
              <div 
                className="w-[32px] h-[32px] overflow-hidden rounded-full relative"
                role="button"
                aria-label="team-info"
                tabIndex={0}
                onClick={handleTeamClick}
                onKeyDown={handleTeamKeyDown}
              >
                <Image
                  className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
                  src={'/logos/' + userFavTeamSymbol + '.svg'} 
                  alt="team-logo"
                  width={20}
                  height={20}
                />
              </div>
            )}
            <p className="text-white text-[14px]" aria-label="reply-author-username">{reply.user_data.username}</p>
          </div>
          <p className="text-white text-[14px] text-white/75" aria-label="created-at-in-Korean">{createdAtInKorean}</p>
        </div>
        <DropdownButton>
          <Image
            src="/icons/settings_24dp_FFFFFF.svg"
            alt="ellipsis"
            width={20}
            height={20}
          />
          {(isAuthenticated && reply.user_data.id === userId) ? (
            <TeamPostsPostCommentsReplyAuthorOptions
              teamId={teamId}
              postId={postId}
              commentId={commentId}
              replyId={reply.id}
            />
          ) : (
            <TeamPostsPostCommentsReplyReaderOptions
              teamId={teamId}
              postId={postId}
              commentId={commentId}
              replyId={reply.id}
            />
          )}
        </DropdownButton>
      </div>
      <p className="text-white text-[14px] leading-4" aria-label="reply-content">{reply.content}</p>
    </li>
  );
}

export default TeamPostsPostCommentsReply;