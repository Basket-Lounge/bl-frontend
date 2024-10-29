import { TeamPost } from "@/models/team.models";
import Link from "next/link";
import { useParams } from "next/navigation";


interface ITeamPostsContainerItemProps {
  post: TeamPost;
}

const TeamPostsContainerItem = ({ post }: ITeamPostsContainerItemProps) => {
  return (
    <Link href={"/teams/" + post.team_data.id + "/posts/" + post.id}>
      <div className="bg-color3 rounded-md p-[24px]">
        <p className="text-white text-[16px] font-semibold">{post.title}</p>
        <p className="text-white text-[16px] mt-[16px]">{post.user_data.username}</p>
      </div>
    </Link>
  );
}

export default TeamPostsContainerItem;