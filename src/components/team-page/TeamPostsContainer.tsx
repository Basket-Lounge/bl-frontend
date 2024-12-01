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
    <div className="flex flex-col gap-[24px] items-stretch">
      {posts.map((post) => (
        <TeamPostsContainerItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default TeamPostsContainer;