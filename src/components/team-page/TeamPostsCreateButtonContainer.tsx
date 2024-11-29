'use client';

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import TeamPostsCreateButton from "./TeamPostsCreateButton";
import { getTeamPostStatusForCreate, publishTeamPost } from "@/api/team.api";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { TeamStoreContext } from "@/stores/teams.stores";
import { useStore } from "zustand";
import { TeamPostError } from "@/models/team.models";
import { AxiosError } from "axios";


const TeamPostsCreateButtonContainer = () => {
  const store = useContext(TeamStoreContext);
  const updateTitle = useStore(store, (state) => state.updatePostsCreateTitle);
  const updateContent = useStore(store, (state) => state.updatePostsCreateContent);
  const updateTitleError = useStore(store, (state) => state.updatePostsCreateTitleError);
  const updateContentError = useStore(store, (state) => state.updatePostsCreateContentError);

  const router = useRouter();
  const { teamId } = useParams();
  const queryClient = useQueryClient();

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
      queryClient.removeQueries({
        queryKey: ["team", teamId as string, "posts", "pagination"]
      });

      updateTitle("");
      updateContent("");
      updateTitleError(null);
      updateContentError(null);

      router.push(`/teams/${teamId}/posts`);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<TeamPostError>;
      if (!axiosError.response) {
        updateTitleError("알 수 없는 오류가 발생했습니다.");
        updateContentError("알 수 없는 오류가 발생했습니다.");
        return;
      }

      if (axiosError.response.status === 400) {
        updateTitleError(axiosError.response?.data.title[0][0] || null);
        updateContentError(axiosError.response?.data.content[0][0] || null);
      }
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