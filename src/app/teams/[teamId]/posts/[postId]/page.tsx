'use client'

import { getTeamPost } from "@/api/team.api";
import TeamPostsPostCommentInput from "@/components/team-page/TeamPostsPostCommentInput";
import TeamPostsPostCommentsContainer from "@/components/team-page/TeamPostsPostCommentsContainer";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";


const PostPage = () => {
  const router = useRouter();
  const { teamId, postId } = useParams();
  
  const postQuery = useSuspenseQuery({
    queryKey: ["team", teamId as string, "posts", postId as string],
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
      <div className="flex items-center gap-[24px]">
        <div className="flex items-center text-[16px] gap-[16px] bg-color3 rounded-full py-[8px] px-[16px]">
          <Image
            src='/icons/favorite_24dp_FFFFFF.svg'
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span>{postQuery.data.likes_count}</span>
        </div>
        <div className="flex items-center text-[16px] gap-[16px] bg-color3 rounded-full py-[8px] px-[16px]">
          <Image
            src='/icons/comment_24dp_FFFFFF.svg'
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span>{postQuery.data.comments_count}</span>
        </div>
      </div>
      <TeamPostsPostCommentInput />
      <TeamPostsPostCommentsContainer />
    </div>
  );
}

export default PostPage;