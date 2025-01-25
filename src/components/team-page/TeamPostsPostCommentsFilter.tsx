'use client'

import FilterButton from "../common/FilterButton";
import TeamPostsPostCommentsSortButtonOptionsContainer from "./TeamPostsPostCommentsSortButtonOptionsContainer";


interface ITeamPostsPostCommentsFilter {
  count: number,
}

const TeamPostsPostCommentsFilter = ({ count }: ITeamPostsPostCommentsFilter) => {
  return (
    <div className="flex justify-between items-end" aria-label="team-posts-post-comments-filter">
      <h3 
        className="text-[20px] font-bold text-white"
        aria-label="team-posts-post-comments-count"
      >
        전체 댓글 ({count}) 💬
      </h3>
      <div className="flex items-center gap-[24px]" aria-label="team-posts-post-comments-sort">
        <FilterButton name="정렬" aria-label="team-posts-post-comments-sort-button">
          <TeamPostsPostCommentsSortButtonOptionsContainer />
        </FilterButton>
      </div>
    </div>
  );
}

export default TeamPostsPostCommentsFilter;