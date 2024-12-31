'use client'

import { getTeamPostStatusForCreate } from "@/api/team.api";
import TeamPostsCreateButtonContainer from "@/components/team-page/TeamPostsCreateButtonContainer";
import TeamPostsCreateContent from "@/components/team-page/TeamPostsCreateContent";
import TeamPostsCreateTitle from "@/components/team-page/TeamPostsCreateTitle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


const CreatePostPage = () => {
  const router = useRouter();
  useSuspenseQuery({
    queryKey: ["team", "post-status", "create"],
    queryFn: async () => {
      return await getTeamPostStatusForCreate();
    }
  });

  const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <h1 className="text-[24px] font-bold">포스트 작성하기</h1>
      <button 
        className="text-white bg-color1 py-[12px] px-[32px] rounded-full w-fit"
        onClick={handleBackButtonClick}
      >
        👈 뒤로가기
      </button>
      <TeamPostsCreateTitle />
      <TeamPostsCreateContent />
      <TeamPostsCreateButtonContainer />
    </div>
  )
}

export default CreatePostPage;