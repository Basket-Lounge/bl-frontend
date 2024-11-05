'use client'

import { UserStoreContext } from "@/app/users/[userId]/layout";
import { TTeamPostsFilter } from "@/models/team.models";
import { useContext } from "react";
import { useStore } from "zustand";

interface IUserPostsFilterButtonProps {
  name: string;
  queryKey: TTeamPostsFilter;
};

const UserPostsFilterButton : React.FC<IUserPostsFilterButtonProps> = ({ name, queryKey }) => {
  const store = useContext(UserStoreContext);
  const currentPostsFilterValue = useStore(store, (state) => state.postsFilterValue);
  const updateCurrentPostsFilterValue = useStore(store, (state) => state.updatePostsFilterValue);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateCurrentPostsFilterValue(queryKey);
  }

  const bgColor = currentPostsFilterValue === queryKey ? "bg-white" : "bg-color3";
  const textColor = currentPostsFilterValue === queryKey ? "text-color3" : "text-white";

  return (
    <button
      onClick={handleClick}
      className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full " + bgColor + " " + textColor}
    >
      {name}
    </button>
  )
}

export default UserPostsFilterButton;