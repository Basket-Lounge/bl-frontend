import { addOrRemoveUserFavoriteTeam } from "@/api/team.api";
import { TeamWithLikes, TTeamLikesResult } from "@/models/team.models";
import { useAuthStore } from "@/stores/auth.stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useStore } from "zustand";
import ImageButton from "../common/ImageButton";


interface ITeamHeaderLikeButtonProps {
  liked: boolean;
  likesCount: number;
}

export default function TeamHeaderLikeButton(
  { liked, likesCount }: ITeamHeaderLikeButtonProps
) {
  const { teamId } = useParams<{teamId: string}>();

  const {
    isAuthenticated
  } = useStore(useAuthStore);


  const queryClient = useQueryClient();
  const teamLikeMutation = useMutation<TTeamLikesResult>({
    mutationFn: () => {
      return addOrRemoveUserFavoriteTeam(teamId);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["team", teamId], 
        (oldData: TeamWithLikes) => {
          return {
            ...oldData,
            liked: data.liked,
            likes_count: data.likes_count
          }
        }
      )
    },
  })

  const handleClick = () => {
    if (!isAuthenticated) return;

    teamLikeMutation.mutate();
  }

  return (
    <ImageButton
      className="bg-color3 rounded-lg p-[12px] font-medium flex gap-[12px] items-center"
      onClick={handleClick}
      pending={teamLikeMutation.isPending}
      disabled={!isAuthenticated || teamLikeMutation.isPending}
      aria-label="team-like-button"
      aria-disabled={!isAuthenticated || teamLikeMutation.isPending}
    >
      {liked ? (
        <Image
          src={"/icons/favorite_fill_24dp_FFFFFF.svg"}
          alt="team-liked"
          width={24}
          height={24}
        />
      ) : (
        <Image
          src={"/icons/favorite_24dp_FFFFFF.svg"}
          alt="team-not-liked"
          width={24}
          height={24}
        />
      )}
      <span aria-label="team-likes-count">{likesCount}</span>
    </ImageButton>
  )
}