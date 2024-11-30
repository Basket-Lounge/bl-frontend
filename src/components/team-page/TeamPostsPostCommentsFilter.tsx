'use client'

import FilterButton from "../common/FilterButton";
import TeamPostsPostCommentsSortButtonOptionsContainer from "./TeamPostsPostCommentsSortButtonOptionsContainer";


interface ITeamPostsPostCommentsFilter {
  count: number,
}

const TeamPostsPostCommentsFilter = ({ count }: ITeamPostsPostCommentsFilter) => {
  return (
    <div className="flex justify-between items-end">
      <h3 className="text-[20px] font-bold text-white">전체 댓글 ({count}) 💬</h3>
      <div className="flex items-center gap-[24px]">
        <FilterButton name="정렬">
          <TeamPostsPostCommentsSortButtonOptionsContainer />
        </FilterButton>
      </div>
    </div>
  );
}

export default TeamPostsPostCommentsFilter;