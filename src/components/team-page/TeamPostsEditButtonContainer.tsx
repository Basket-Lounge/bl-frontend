'use client';

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import TeamPostsEditButton from "./TeamPostsEditButton";
import { editTeamPost, getTeamPostStatusForCreate } from "@/api/team.api";
import { useParams, useRouter } from "next/navigation";
import { useTeamStore } from "@/stores/teams.stores";
import { TeamPostError } from "@/models/team.models";
import { AxiosError } from "axios";
import SpinnerLoading from "../common/SpinnerLoading";
import { toast } from "react-toastify";


const TeamPostsEditButtonContainer = () => {
  const {
    updatePostsEditTitle: updateTitle,
    updatePostsEditContent: updateContent,
    updatePostsEditTitleError: updateTitleError,
    updatePostsEditContentError: updateContentError
  } = useTeamStore();

  const router = useRouter();
  const { teamId, postId } = useParams<{ teamId: string, postId: string }>();
  const queryClient = useQueryClient();

  const postStatusQuery = useSuspenseQuery({
    queryKey: ["team", "post-status", "create"],
    queryFn: async () => {
      return await getTeamPostStatusForCreate();
    }
  });

  const mutation = useMutation({
    mutationFn: (post: { title: string, content: string, status: number }) => {
      return editTeamPost(
        teamId, 
        postId, 
        {
          title: post.title, 
          content: post.content, 
          status: post.status
        }
      );
    },
    onSuccess: () => {
      updateTitle("");
      updateContent("");
      updateTitleError(null);
      updateContentError(null);

      queryClient.invalidateQueries({
        queryKey: ["team", teamId, "posts", postId, "post"]
      });
      queryClient.invalidateQueries({
        queryKey: ["team", teamId, "posts", "pagination"]
      });
      queryClient.invalidateQueries({
        queryKey: ['my-page', "posts", "pagination"],
      })
      router.back();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<TeamPostError>;
      if (!axiosError.response) {
        updateTitleError("알 수 없는 오류가 발생했습니다.");
        updateContentError("알 수 없는 오류가 발생했습니다.");
        toast.error("알 수 없는 오류가 발생했습니다.");
        return;
      }

      if (axiosError.response.status === 400) {
        if (axiosError.response.data.title[0][0]) {
          updateTitleError(axiosError.response.data.title[0][0]);
          toast.error(axiosError.response.data.title[0][0]);
        } else {
          updateTitleError(null);
        }

        if (axiosError.response.data.content[0][0]) {
          updateContentError(axiosError.response.data.content[0][0] || null);
          toast.error(axiosError.response.data.content[0][0]);
        } else {
          updateContentError(null);
        }
      }
    }
  });

  const handleEditPost = (title: string, content: string, status: number) => {
    mutation.mutate({
      title,
      content,
      status
    });
  }

  if (mutation.isPending) {
    return <SpinnerLoading />;
  }

  return (
    <div className="flex items-center gap-[16px] justify-center">
      {postStatusQuery.data.map((status) => (
        <TeamPostsEditButton 
          key={status.id} 
          status={status} 
          callback={handleEditPost} 
        />
      ))}
    </div>
  );
}

export default TeamPostsEditButtonContainer;