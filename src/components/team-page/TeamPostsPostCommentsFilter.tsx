'use client'

import TeamPostsPostCommentsFilterButton from "./TeamPostsPostCommentsFilterButton";


interface ITeamPostsPostCommentsFilter {
  count: number,
}

const TeamPostsPostCommentsFilter = ({ count }: ITeamPostsPostCommentsFilter) => {
  return (
    <div className="flex justify-between items-end">
      <h3 className="text-[20px] font-bold text-white">전체 댓글 ({count}) 💬</h3>
      <div className="flex items-center gap-[24px]">
        <TeamPostsPostCommentsFilterButton queryKey="recent" name="최신순" />
        <TeamPostsPostCommentsFilterButton queryKey="oldest" name="오래순" />
        <TeamPostsPostCommentsFilterButton queryKey="popular" name="인기순" />
      </div>
    </div>
  );
}

export default TeamPostsPostCommentsFilter;