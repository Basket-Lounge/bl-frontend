import TeamPostsFilterButton from "./TeamPostsFilterButton";
import TeamPostsSearchBox from "./TeamPostsSearchBox";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";


const TeamPostsFilter = () => {
  const router = useRouter();
  const { teamId } = useParams();

  const handleCreateButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/teams/" + teamId + "/posts/create");
  }

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <TeamPostsFilterButton name="전체" queryKey="all" />
        <TeamPostsFilterButton name="최근" queryKey="recent" />
        <TeamPostsFilterButton name="인기" queryKey="popular" />
      </div>
      <div className="flex gap-[24px] items-center">
        <button
          className="bg-color1 text-white rounded-full py-[12px] px-[20px] flex items-center gap-[8px]"
          onClick={handleCreateButtonClick}
        >
          <Image
            src="/icons/edit_24dp_FFFFFF.svg"
            alt="글쓰기"
            width={20}
            height={20}
          />
          글쓰기
        </button>
        <TeamPostsSearchBox />
      </div>
    </div>
  );
}

export default TeamPostsFilter;