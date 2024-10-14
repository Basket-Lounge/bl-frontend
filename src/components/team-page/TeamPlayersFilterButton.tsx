import { TeamStoreContext } from "@/app/teams/[teamId]/layout";
import { useContext } from "react";
import { useStore } from "zustand";


interface ITeamPlayersFilterButtonProps {
  name: string;
  queryKey: string;
};

const TeamPlayersFilterButton : React.FC<ITeamPlayersFilterButtonProps> = ({ name, queryKey }) => {
  const store = useContext(TeamStoreContext);
  const currentPlayersFilterValue = useStore(store, (state) => state.playersFilterValue);
  const updatePlayersFilterValue = useStore(store, (state) => state.updatePlayersFilterValue);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updatePlayersFilterValue(queryKey);
  }

  const bgColor = currentPlayersFilterValue === queryKey ? "bg-white" : "bg-color3";
  const textColor = currentPlayersFilterValue === queryKey ? "text-color3" : "text-white";

  return (
    <button
      onClick={handleClick}
      className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full " + bgColor + " " + textColor}
    >
      {name}
    </button>
  )
}

export default TeamPlayersFilterButton;