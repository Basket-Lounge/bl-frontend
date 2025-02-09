import { TeamPost } from "@/models/team.models";
import { timeAgoKorean } from "@/utils/common.utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.stores";
import { Suspense } from "react";
import ButtonLoading from "../common/ButtonLoading";
import DropdownButton from "../common/DropdownButton";
import TeamPostsPostItemOptions from "./TeamPostsPostItemOptions";
import TeamPostsPostItemReaderOptions from "./TeamPostsPostItemReaderOptions";


interface ITeamPostsContainerItemProps {
  post: TeamPost;
}

const TeamPostsContainerItem = ({ post }: ITeamPostsContainerItemProps) => {
  const router = useRouter();

  const {
    isAuthenticated,
    userId
  } = useAuthStore();

  const userFavTeamSymbol = post.user_data.favorite_team?.symbol;
  const userFavTeamId = post.user_data.favorite_team?.id;
  const uploadDateInKorean = timeAgoKorean(post.created_at);

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
    router.push("/users/" + post.user_data.id + "/general-info");
  }

  const handleUserKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleUserClick();
    }
  }

  const handlePostClick = () => {
    router.push("/teams/" + post.team_data.id + "/posts/" + post.id);
  }

  const handlePostKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      handlePostClick();
    }
  }

  return (
    <li
      className="p-[24px] flex flex-col gap-[16px]" 
      aria-label="team-post"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[32px]">
          <div 
            className="flex gap-[16px] items-center" 
            aria-label="user-info"
          >
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
                  className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[16px] text-color1"
                  aria-label="user-username-initial"
                >
                  {post.user_data.username.slice(0, 1) || 'U'}
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
            <p 
              className="text-[14px] font-medium" 
              aria-label="username"
              tabIndex={0}
              onClick={handleUserClick}
              onKeyDown={handleUserKeyDown}
              role="button"
            >
              {post.user_data.username}
            </p>
          </div>
          <p className="text-[14px] text-white/75" aria-label="uploaded-date">{uploadDateInKorean}</p>
        </div>
        <Suspense fallback={<ButtonLoading />}>
          {isAuthenticated && (
            <DropdownButton 
              emptyStyle={true}
              aria-label="post-actions"
            >
              <Image
                src="/icons/settings_24dp_FFFFFF.svg"
                alt="ellipsis"
                width={24}
                height={24}
              />
            {userId === post.user_data.id ? (
              <TeamPostsPostItemOptions 
                postId={post.id} 
                teamId={post.team_data.id.toString()} 
                moveBack={false}
              />
            ) : (
              <TeamPostsPostItemReaderOptions 
                postId={post.id} 
                teamId={post.team_data.id.toString()} 
                moveBack={false}
              />
            )}
            </DropdownButton>
          )}
        </Suspense>
      </div>
      <h3 
        className="text-white text-[20px] font-semibold" 
        onClick={handlePostClick} 
        role="button"
        aria-label="post-title"
        tabIndex={0}
        onKeyDown={handlePostKeyDown}
      >
        {post.title}
      </h3>
      <p 
        className="text-white text-[14px] line-clamp-6 leading-relaxed" 
        onClick={handlePostClick}
        role="button"
        aria-label="post-content"
        tabIndex={0}
        onKeyDown={handlePostKeyDown}
      >
        {post.content}
      </p>
      <div className="flex items-center gap-[24px]">
        <div className="flex items-center gap-[12px]" aria-label="likes-count">
          {post.liked ? (
            <Image
              src="/icons/favorite_fill_24dp_FFFFFF.svg"
              width={20}
              height={20}
              alt="like-with-user-liked"
            />
          ) : (
            <Image
              src="/icons/favorite_24dp_FFFFFF.svg"
              width={20}
              height={20}
              alt="like-without-user-liked"
            />
          )}
          <span className="text-white text-[14px]">{post.likes_count}</span>
        </div>
        <div className="flex items-center gap-[12px]" aria-label="comments-count">
          <Image
            src="/icons/comment_24dp_FFFFFF.svg"
            width={20}
            height={20}
            alt="comments"
          />
          <span className="text-white text-[14px]">{post.comments_count}</span>
        </div>
      </div>
    </li>
  )
}

export default TeamPostsContainerItem;