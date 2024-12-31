import { deleteTeamPost } from "@/api/team.api";
import useClickOutside from "@/hooks/useClickOutside";
import { TeamPost } from "@/models/team.models";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { useStore } from "zustand";
import ButtonLoading from "../common/ButtonLoading";
import { MyPageStoreContext } from "@/stores/myPage.stores";
import { useRouter } from "next/navigation";


interface IUsersPostsContainerOptionsProps {
  post: TeamPost;
}

const UsersPostsContainerOptions = ({ post }: IUsersPostsContainerOptionsProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(menuButtonRef, setIsMenuOpen);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
    e.stopPropagation();
  }

  const store = useContext(MyPageStoreContext);
  const setLastModifiedPostId = useStore(store, (state) => state.setLastModifiedPostId);

  const deletePostMutation = useMutation({
    mutationFn: () => {
      return deleteTeamPost(post.team_data.id.toString(), post.id);
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

  const handleEditPostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/teams/${post.team_data.id}/posts/${post.id}/edit`);
    e.stopPropagation();
  }

  return (
    <button 
      className="text-white font-medium relative"
      disabled={deletePostMutation.isPending}
      onClick={handleClick}
      ref={menuButtonRef}
    >
      {(deletePostMutation.isPending) ? (
        <ButtonLoading />
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
          <button 
            className="text-white font-medium p-[16px] hover:bg-color4"
            onClick={handleDeletePostClick}
          >
            삭제하기
          </button>
          <button 
            className="text-white font-medium p-[16px] hover:bg-color4"
            onClick={handleEditPostClick}
          >
            수정하기
          </button>
        </div>
      )}
    </button>
  );
}

export default UsersPostsContainerOptions;