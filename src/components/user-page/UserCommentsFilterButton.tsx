'use client'

import { UserStoreContext } from '@/stores/users.stores';
import { TTeamPostsFilter } from "@/models/team.models";
import { useContext } from "react";
import { useStore } from "zustand";


interface IUserCommentsFilterButtonProps {
  name: string;
  queryKey: TTeamPostsFilter;
};

const UserCommentsFilterButton : React.FC<IUserCommentsFilterButtonProps> = ({ name, queryKey }) => {
  const store = useContext(UserStoreContext);
  const currentCommentsFilterValue = useStore(store, (state) => state.commentsFilterValue);
  const updateCurrentCommentsFilterValue = useStore(store, (state) => state.updateCommentsFilterValue);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateCurrentCommentsFilterValue(queryKey);
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

export default UserCommentsFilterButton;