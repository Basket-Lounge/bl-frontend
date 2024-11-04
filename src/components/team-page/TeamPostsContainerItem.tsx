import { TeamPost } from "@/models/team.models";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface ITeamPostsContainerItemProps {
  post: TeamPost;
}

const TeamPostsContainerItem = ({ post }: ITeamPostsContainerItemProps) => {
  const router = useRouter();

  const handlePostClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push("/teams/" + post.team_data.id + "/posts/" + post.id);
  }

  return (
    <div className="bg-color3 rounded-md p-[24px]" onClick={handlePostClick}>
      <p className="text-white text-[16px] font-semibold">{post.title}</p>
      <p className="text-white text-[14px] mt-[16px]">{post.user_data.username}</p>
      <div className="flex items-center gap-[16px] mt-[16px]">
        <div className="flex items-center gap-[16px]">
          {post.liked ? (
            <Image
              src="/icons/favorite_fill_24dp_FFFFFF.svg"
              width={24}
              height={24}
              alt="likes"
            />
          ) : (
            <Image
              src="/icons/favorite_24dp_FFFFFF.svg"
              width={24}
              height={24}
              alt="likes"
            />
          )}
          <span className="text-white">{post.likes_count}</span>
        </div>
        <div className="flex items-center gap-[16px]">
          <Image
            src="/icons/comment_24dp_FFFFFF.svg"
            width={24}
            height={24}
            alt="comments"
          />
          <span className="text-white">{post.comments_count}</span>
        </div>
      </div>
    </div>
  );
}

export default TeamPostsContainerItem;