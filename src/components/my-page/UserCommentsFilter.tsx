import UserCommentsFilterButton from "./UserCommentsFilterButton";
import UserCommentsSearchBox from "./UserCommentsSearchBox";


const UserCommentsFilter = () => {
  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-[24px]">
        <UserCommentsFilterButton name="최근" queryKey="recent" />
        <UserCommentsFilterButton name="인기" queryKey="popular" />
      </div>
      <div className="flex gap-[24px] items-center">
        <UserCommentsSearchBox />
      </div>
    </div>
  );
}

export default UserCommentsFilter;