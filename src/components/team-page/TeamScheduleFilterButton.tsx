import { TeamStoreContext } from "@/app/teams/[teamId]/layout";
import { useContext } from "react";
import { useStore } from "zustand";

interface ITeamScheduleFilterButtonProps {
  name: string;
  queryKey: string;
};

const TeamScheduleFilterButton : React.FC<ITeamScheduleFilterButtonProps> = ({ name, queryKey }) => {
  const store = useContext(TeamStoreContext);
  const currentScheduleFilterValue = useStore(store, (state) => state.currentScheduleFilterValue);
  const updateCurrentScheduleFilterValue = useStore(store, (state) => state.updateCurrentScheduleFilterValue);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateCurrentScheduleFilterValue(queryKey);
  }

  const bgColor = currentScheduleFilterValue === queryKey ? "bg-white" : "bg-color3";
  const textColor = currentScheduleFilterValue === queryKey ? "text-color3" : "text-white";

  return (
    <button
      onClick={handleClick}
      className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full " + bgColor + " " + textColor}
    >
      {name}
    </button>
  )
}

export default TeamScheduleFilterButton;