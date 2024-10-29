'use client'

import { getTeamPostStatusForCreate } from "@/api/team.api";
import TeamPostsCreateButtonContainer from "@/components/team-page/TeamPostsCreateButtonContainer";
import TeamPostsCreateContent from "@/components/team-page/TeamPostsCreateContent";
import TeamPostsCreateTitle from "@/components/team-page/TeamPostsCreateTitle";
import { useSuspenseQuery } from "@tanstack/react-query";


const CreatePostPage = () => {
  const postStatusQuery = useSuspenseQuery({
    queryKey: ["team", "post-status", "create"],
    queryFn: async () => {
      return await getTeamPostStatusForCreate();
    }
  });

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      <TeamPostsCreateTitle />
      <TeamPostsCreateContent />
      <TeamPostsCreateButtonContainer />
    </div>
  )
}

export default CreatePostPage;