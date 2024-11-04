import { addUserFavoriteTeam, removeUserFavoriteTeam } from "@/api/team.api";
import { TTeamLikesResult } from "@/models/team.models";
import { useAuthStore } from "@/stores/auth.stores";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useStore } from "zustand";
import TeamHeaderLikeButtonSpinner from "./TeamHeaderLikeButtonSpinner";


interface ITeamHeaderLikeButtonProps {
  liked: boolean;
  likesCount: number;
}

export default function TeamHeaderLikeButton(
  { liked, likesCount }: ITeamHeaderLikeButtonProps
) {
  const { teamId } = useParams();
  const [realLikesCount, setRealLikesCount] = useState(likesCount);
  const [realLiked, setRealLiked] = useState(liked);

  const {
    isAuthenticated
  } = useStore(useAuthStore);

  const teamLikeMutation = useMutation<TTeamLikesResult>({
    mutationFn: () => {
      if (realLiked) {
        return removeUserFavoriteTeam(teamId as string);
      }

      return addUserFavoriteTeam(teamId as string);
    },
    onSuccess: (data) => {
      setRealLiked(data.liked ? true : false);
      setRealLikesCount(data.likes_count);
    },
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    teamLikeMutation.mutate();
  }

  return (
    <button 
      className="bg-color3 rounded-lg text-[16px] p-[12px] font-medium flex gap-[12px] items-center"
      onClick={handleClick}
      disabled={!isAuthenticated || teamLikeMutation.isPending}
    >
      {realLiked ? (
        <Image
          src={"/icons/favorite_fill_24dp_FFFFFF.svg"}
          alt="favorite"
          width={24}
          height={24}
        />
      ) : (
        <Image
          src={"/icons/favorite_24dp_FFFFFF.svg"}
          alt="favorite"
          width={24}
          height={24}
        />
      )}
      { teamLikeMutation.isPending ?
        <TeamHeaderLikeButtonSpinner /> :
        realLikesCount
      }
    </button>
  )
}