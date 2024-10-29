'use client';

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import TeamPostsCreateButton from "./TeamPostsCreateButton";
import { getTeamPostStatusForCreate, publishTeamPost } from "@/api/team.api";
import { useParams, useRouter } from "next/navigation";


const TeamPostsCreateButtonContainer = () => {
  const router = useRouter();
  const { teamId } = useParams();
  const postStatusQuery = useSuspenseQuery({
    queryKey: ["team", "post-status", "create"],
    queryFn: async () => {
      return await getTeamPostStatusForCreate();
    }
  });

  const mutation = useMutation({
    mutationFn: (post: { title: string, content: string, status: number }) => {
      return publishTeamPost(teamId as string, post.title, post.content, post.status)
    },
    onSuccess: () => {
      router.push(`/teams/${teamId}/posts`);
    }
  });

  const handleCreatePost = (title: string, content: string, status: number) => {
    mutation.mutate({
      title,
      content,
      status
    });
  }

  if (mutation.isPending) {
    return <div>Creating post...</div>
  }

  return (
    <div className="flex items-center gap-[16px] justify-center">
      {postStatusQuery.data.map((status) => (
        <TeamPostsCreateButton 
          key={status.id} 
          status={status} 
          callback={handleCreatePost} 
        />
      ))}
    </div>
  );
}

export default TeamPostsCreateButtonContainer;