import { TeamPost } from "@/models/team.models";
import TeamPostsContainerItem from "./TeamPostsContainerItem";
import CuteErrorMessage from "../common/CuteErrorMessage";


interface ITeamPostsContainerProps {
  posts: TeamPost[];
}

const TeamPostsContainer = ({ posts }: ITeamPostsContainerProps) => {
  if (posts.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage error="포스트가 없습니다." />
      </div>
    );
  }

  return (
    <ul className="flex flex-col items-stretch divide-y-[1px] divide-white/25 border-t-[1px] border-b-[1px] border-white/25">
      {posts.map((post) => (
        <TeamPostsContainerItem key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default TeamPostsContainer;