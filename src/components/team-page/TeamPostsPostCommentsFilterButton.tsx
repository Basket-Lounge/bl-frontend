'use client'

import { useContext } from "react";
import { useStore } from "zustand";
import { PostCommentsContext } from "./TeamPostsPostCommentsContainer";

interface ITeamPostsPostCommentsFilterButtonProps {
  name: string;
  queryKey: "recent" | "oldest" | "popular";
};

const TeamPostsPostCommentsFilterButton : React.FC<ITeamPostsPostCommentsFilterButtonProps> = ({ name, queryKey }) => {
  const store = useContext(PostCommentsContext);

  const updatePage = useStore(store, (state) => state.updatePage);
  const currentCommentsFilterValue = useStore(store, (state) => state.currentCommentsFilterValue);
  const updateCurrentScheduleFilterValue = useStore(store, (state) => state.updateCurrentCommentsFilterValue);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    updateCurrentScheduleFilterValue(queryKey);
    updatePage(1);
  }

  const bgColor = currentCommentsFilterValue === queryKey ? "bg-white" : "bg-color3";
  const textColor = currentCommentsFilterValue === queryKey ? "text-color3" : "text-white";

  return (
    <button
      onClick={handleClick}
      className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full " + bgColor + " " + textColor}
    >
      {name}
    </button>
  )
}

export default TeamPostsPostCommentsFilterButton;