'use client'

import { getTeamPost } from "@/api/team.api";
import TeamPostsPostCommentInput from "@/components/team-page/TeamPostsPostCommentInput";
import TeamPostsPostCommentsContainer from "@/components/team-page/TeamPostsPostCommentsContainer";
import TeamPostsPostLikeCommentButtonContainer from "@/components/team-page/TeamPostsPostLikeCommentButtonContainer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";


const PostPage = () => {
  const router = useRouter();
  const { teamId, postId } = useParams();
  
  const postQuery = useSuspenseQuery({
    queryKey: ["team", teamId as string, "posts", postId as string, "post"],
    queryFn: async () => {
      return await getTeamPost(teamId as string, postId as string);
    }
  });

  const handleBackButtonClick = () => {
    router.back();
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <button 
        className="text-white bg-color1 py-[12px] px-[32px] rounded-full w-fit"
        onClick={() => handleBackButtonClick()}
      >
        👈 뒤로가기
      </button>
      <div className="flex flex-col items-stretch gap-[16px]">
        <h1
          className="bg-transparent text-white font-semibold outline-none grow text-[24px]"
        >
          {postQuery.data.title}
        </h1>
        <div className="flex items-center gap-[16px]">
          <div className="p-[20px] rounded-full bg-white">

          </div>
          <span className="bg-transparent text-white outline-none grow text-[14px]">
            {postQuery.data.user_data.username}
          </span>
        </div>
      </div>
      <p
        className="bg-transparent text-white outline-none grow text-[16px] leading-4 my-[24px]"
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
    </div>
  );
}

export default PostPage;