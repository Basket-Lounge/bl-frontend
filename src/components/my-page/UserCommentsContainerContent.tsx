'use client'

import { useRouter } from "next/navigation";

interface IUserCommentsContainerContentProps {
  content: string;
  teamId: string;
  postId: string;
}

const UserCommentsContainerContent = ({ content, teamId, postId }: IUserCommentsContainerContentProps) => {
  const router = useRouter();

  const handlePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/teams/" + teamId + "/posts/" + postId);
  }

  return (
    <button
      onClick={handlePostClick}
      className="block text-left w-full"
    >
      <p 
        className="text-white text-[16px] font-semibold line-clamp-1"
      >
        {content}
      </p>
    </button>
  );
}

export default UserCommentsContainerContent