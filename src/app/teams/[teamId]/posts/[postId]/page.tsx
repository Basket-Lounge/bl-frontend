'use client'

import { getTeamPost } from "@/api/team.api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";


const PostPage = () => {
  const { teamId, postId } = useParams();
  
  const postQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "posts", postId],
    queryFn: async () => {
      return await getTeamPost(teamId as string, postId as string);
    }
  });

  return (
    <div>
      {postQuery.data.title}
      {postQuery.data.content}
    </div>
  );
}

export default PostPage;