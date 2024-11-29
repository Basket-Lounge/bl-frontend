import { TeamStoreContext } from "@/stores/teams.stores";
import { TTeamPostsFilter } from "@/models/team.models";
import { useContext } from "react";
import { useStore } from "zustand";

interface ITeamPostsFilterButtonProps {
  name: string;
  queryKey: TTeamPostsFilter;
};

const TeamPostsFilterButton : React.FC<ITeamPostsFilterButtonProps> = ({ name, queryKey }) => {
  const store = useContext(TeamStoreContext);
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

export default TeamPostsFilterButton;