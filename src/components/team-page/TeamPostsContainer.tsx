import { TeamPost } from "@/models/team.models";
import TeamPostsContainerItem from "./TeamPostsContainerItem";


interface ITeamPostsContainerProps {
  posts: TeamPost[];
}

const TeamPostsContainer = ({ posts }: ITeamPostsContainerProps) => {
  if (posts.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center gap-[16px]">
        <p className="font-bold text-[32px]">
          (つ╥﹏╥)つ
        </p>
        <p className="font-bold text-[32px]">
          포스트가 없습니다.
        </p>
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