import { TeamPost } from "@/models/team.models";
import { timeAgoKorean } from "@/utils/common.utils";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface TeamGeneralInfoPopularPostsItemProps {
  post: TeamPost;
}

const TeamGeneralInfoPopularPostsItem = (
  { post }: TeamGeneralInfoPopularPostsItemProps
) => {
  const router = useRouter();

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
    <li className="p-[24px] rounded-md block border border-white/25 flex flex-col gap-[24px]">
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
      <h3 
        className="text-[16px] font-semibold" 
        aria-label="post-title" 
        tabIndex={0} 
        onClick={handlePostClick} 
        onKeyDown={handlePostKeyDown} 
        role="button"
      >
        {post.title}
      </h3>
      <div className="flex items-center gap-[24px]"> 
        <div className="gap-[12px] flex items-center">
          <Image
            src="/icons/thumb_up_24dp.svg"
            alt="like"
            width={20}
            height={20}
          />
          <p className="text-[16px]">
            {post.likes_count}
          </p>
        </div>
        <div className="gap-[12px] flex items-center">
          <Image
            src="/icons/comment_24dp_FFFFFF.svg"
            alt="comment"
            width={20}
            height={20}
          />
          <p className="text-[16px]">
            {post.comments_count}
          </p>
        </div>
      </div>
    </li>
  )
}

export default TeamGeneralInfoPopularPostsItem;