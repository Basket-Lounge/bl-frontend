import { GameStoreContext } from "@/stores/games.stores";
import { useContext } from "react";
import { useStore } from "zustand";


interface IGameBoxScoreTeamFilterButtonProps {
  name: string;
  queryKey: string | null;
};

const GameBoxScoreTeamFilterButton: React.FC<IGameBoxScoreTeamFilterButtonProps> = ({ name, queryKey }) => {
  const store = useContext(GameStoreContext);
  const currentBoxScoreTeamId = useStore(store, (state) => state.boxScoreTeamId);
  const updateBoxScoreTeamId = useStore(store, (state) => state.setBoxScoreTeamId);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateBoxScoreTeamId(queryKey);
  }

  const bgColor = currentBoxScoreTeamId === queryKey ? "bg-white" : "bg-color3";
  const textColor = currentBoxScoreTeamId === queryKey ? "text-color3" : "text-white";

  return (
    <button
      onClick={handleClick}
      className={"text-[14px] font-semibold px-[32px] py-[2px] rounded-full " + bgColor + " " + textColor}
    >
      {name}
    </button>
  )
}

export default GameBoxScoreTeamFilterButton;