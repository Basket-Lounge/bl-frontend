'use client'

import TeamPostsEditButtonContainer from "@/components/team-page/TeamPostsEditButtonContainer";
import TeamPostsEditContent from "@/components/team-page/TeamPostsEditContent";
import TeamPostsEditTitle from "@/components/team-page/TeamPostsEditTitle";
import { useRouter } from "next/navigation";


const EditPostPage = () => {
  const router = useRouter();
  const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  }

  return (
    <section className="flex flex-col gap-[24px] items-stretch" aria-label="edit-post">
      <h1 className="text-[24px] font-bold">포스트 수정하기</h1>
      <button 
        className="text-white bg-color1 py-[12px] px-[32px] rounded-full w-fit"
        onClick={handleBackButtonClick}
      >
        👈 뒤로가기
      </button>
      <TeamPostsEditTitle />
      <TeamPostsEditContent />
      <TeamPostsEditButtonContainer />
    </section>
  )
}

export default EditPostPage;