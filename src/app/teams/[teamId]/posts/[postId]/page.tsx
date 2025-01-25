'use client'

import { getTeamPost } from "@/api/team.api";
import DropdownButton from "@/components/common/DropdownButton";
import TeamPostsPostCommentInput from "@/components/team-page/TeamPostsPostCommentInput";
import TeamPostsPostCommentsContainer from "@/components/team-page/TeamPostsPostCommentsContainer";
import TeamPostsPostOptions from "@/components/team-page/TeamPostsPostItemOptions";
import TeamPostsPostLikeCommentButtonContainer from "@/components/team-page/TeamPostsPostLikeCommentButtonContainer";
import { useAuthStore } from "@/stores/auth.stores";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";


const PostPage = () => {
  const router = useRouter();
  const { userId } = useAuthStore();
  const { teamId, postId } = useParams<{ teamId: string, postId: string }>();
  
  const postQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "posts", postId, "post"],
    queryFn: async () => {
      return await getTeamPost(teamId, postId);
    },
    staleTime: 86400000,
  });

  const userFavTeamSymbol = postQuery.data.user_data.favorite_team?.symbol;

  const handleBackButtonClick = () => {
    router.back();
  }

  const handleTeamClick = () => {
    router.push("/teams/" + postQuery.data.team_data.id + "/general-info");
  }

  const handleTeamKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleTeamClick();
    }
  }

  return (
    <section className="flex flex-col gap-[24px] items-stretch" aria-label="post-page">
      <button 
        className="text-white bg-color1 py-[12px] px-[32px] rounded-full w-fit"
        onClick={() => handleBackButtonClick()}
        aria-label="back-button"
      >
        👈 뒤로가기
      </button>
      <div className="flex flex-col items-stretch gap-[16px]">
        <div className="flex items-end justify-between relative">
          <h1
            className="bg-transparent text-white font-semibold outline-none grow text-[24px]"
            aria-label="post-title"
          >
            {postQuery.data.title}
          </h1>
          {userId === postQuery.data.user_data.id && (
            <DropdownButton 
              text={
                <Image
                  src="/icons/settings_24dp_FFFFFF.svg"
                  alt="ellipsis"
                  width={24}
                  height={24}
                />
              }
              aria-label="post-actions"
            >
              <TeamPostsPostOptions postId={postId} teamId={teamId} />
            </DropdownButton>
          )}
        </div>
        <div className="flex items-center gap-[16px]">
          {userFavTeamSymbol == null ? (
            <div 
              className="w-[32px] h-[32px] overflow-hidden rounded-full relative bg-white"
              aria-label="user-info"
            >
              <div className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[14px] xl:text-[16px] text-color1">
                {postQuery.data.user_data.username.slice(0, 1) || 'U'}
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
          <span 
            className="bg-transparent text-white outline-none grow text-[14px]"
            aria-label="post-author"
          >
            {postQuery.data.user_data.username}
          </span>
        </div>
      </div>
      <p
        className="bg-transparent text-white outline-none grow text-[16px] leading-relaxed my-[20px]"
        aria-label="post-content"
      >
        {postQuery.data.content}
      </p>
      <TeamPostsPostLikeCommentButtonContainer
        likesCount={postQuery.data.likes_count}
        commentsCount={postQuery.data.comments_count}
        liked={postQuery.data.liked ? true : false}
      />
      <TeamPostsPostCommentInput />
      <TeamPostsPostCommentsContainer />
    </section>
  );
}

export default PostPage;