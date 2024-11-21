import { updatePost } from "@/api/admin.api";
import { getTeamPostStatus } from "@/api/team.api";
import { AdminPageStoreContext } from "@/app/admin/layout";
import useClickOutside from "@/hooks/useClickOutside";
import { TeamPost } from "@/models/team.models";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { useStore } from "zustand";
import TeamHeaderLikeButtonSpinner from "../team-page/TeamHeaderLikeButtonSpinner";


interface IAdminUsersDetailsPostsContainerOptionsProps {
  post: TeamPost;
}

const AdminUsersDetailsPostsContainerOptions = ({ post }: IAdminUsersDetailsPostsContainerOptionsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(menuButtonRef, setIsMenuOpen);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
    e.stopPropagation();
  }

  const store = useContext(AdminPageStoreContext);
  const setLastModifiedPostId = useStore(store, (state) => state.setLastModifiedPostId);

  const teamPostStatusesQuery = useSuspenseQuery({
    queryKey: ['admin', 'users', "posts", "statuses"],
    queryFn: async () => {
      return await getTeamPostStatus();
    },
  });


  const deletePostMutation = useMutation({
    mutationFn: () => {
      const createdStatusId = teamPostStatusesQuery.data.find(
        (status) => status.name === "deleted"
      )?.id;

      return updatePost(post.id, { status: createdStatusId });
    },
    onSuccess: () => {
      setLastModifiedPostId(post.id);
    }
  });

  const hidePostMutation = useMutation({
    mutationFn: () => {
      const hiddenStatusId = teamPostStatusesQuery.data.find(
        (status) => status.name === "hidden"
      )?.id;

      return updatePost(post.id, { status: hiddenStatusId });
    },
    onSuccess: () => {
      setLastModifiedPostId(post.id);
    }
  });

  const restorePostMutation = useMutation({
    mutationFn: () => {
      const createdStatusId = teamPostStatusesQuery.data.find( 
        (status) => status.name === "created"
      )?.id;

      return updatePost(post.id, { status: createdStatusId });
    },
    onSuccess: () => {
      setLastModifiedPostId(post.id);
    }
  });

  const handleDeletePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deletePostMutation.mutate();
    isMenuOpen && setIsMenuOpen(false);
    e.stopPropagation();
  }

  const handleHidePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    hidePostMutation.mutate();
    isMenuOpen && setIsMenuOpen(false);
    e.stopPropagation();
  }

  const handleRestorePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    restorePostMutation.mutate();
    isMenuOpen && setIsMenuOpen(false);
    e.stopPropagation();
  }

  return (
    <button 
      className="text-white font-medium relative"
      disabled={deletePostMutation.isPending || hidePostMutation.isPending || restorePostMutation.isPending}
      onClick={handleClick}
      ref={menuButtonRef}
    >
      {(deletePostMutation.isPending || hidePostMutation.isPending || restorePostMutation.isPending) ? (
        <TeamHeaderLikeButtonSpinner />
      ) : (
        <Image
          src="/icons/options_24dp_FFFFFF.svg"
          width={24}
          height={24}
          alt="options"
        />
      )}
      {isMenuOpen && (
        <div className="absolute top-[150%] right-[0px] bg-color1 text-white rounded-md w-max flex flex-col overflow-hidden">
        {post.status_data.name != "created" && (
          <button 
            className="text-white font-medium p-[16px] hover:bg-color4"
            onClick={handleRestorePostClick}
          >
            복구하기
          </button>
        )}
        {post.status_data.name != "deleted" && (
          <button 
            className="text-white font-medium p-[16px] hover:bg-color4"
            onClick={handleDeletePostClick}
          >
            삭제하기
          </button>
        )}
        {post.status_data.name !== "hidden" && (
          <button 
            className="text-white font-medium p-[16px] hover:bg-color4"
            onClick={handleHidePostClick}
          >
            숨기기
          </button>
        )}
      </div>
      )}
    </button>
  );
}

export default AdminUsersDetailsPostsContainerOptions;