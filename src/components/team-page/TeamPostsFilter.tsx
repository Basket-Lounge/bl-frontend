import Link from "next/link";
import TeamPostsFilterButton from "./TeamPostsFilterButton";
import TeamPostsSearchBox from "./TeamPostsSearchBox";
import { useParams } from "next/navigation";


const TeamPostsFilter = () => {
  const { teamId } = useParams();

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <TeamPostsFilterButton name="전체" queryKey="all" />
        <TeamPostsFilterButton name="최근" queryKey="recent" />
        <TeamPostsFilterButton name="인기" queryKey="popular" />
      </div>
      <div className="flex gap-[24px] items-center">
        <Link
          className="bg-color1 text-white rounded-full py-[12px] px-[20px]"
          href={"/teams/" +  teamId + "/posts/create"}
        >
          글쓰기
        </Link>
        <TeamPostsSearchBox />
      </div>
    </div>
  );
}

export default TeamPostsFilter;