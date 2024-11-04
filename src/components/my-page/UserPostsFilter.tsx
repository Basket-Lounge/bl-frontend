import UserPostsFilterButton from "./UserPostsFilterButton";
import UserPostsSearchBox from "./UserPostsSearchBox";


const UserPostsFilter = () => {
  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <UserPostsFilterButton name="전체" queryKey="all" />
        <UserPostsFilterButton name="최근" queryKey="recent" />
        <UserPostsFilterButton name="인기" queryKey="popular" />
      </div>
      <div className="flex gap-[24px] items-center">
        <UserPostsSearchBox />
      </div>
    </div>
  );
}

export default UserPostsFilter;