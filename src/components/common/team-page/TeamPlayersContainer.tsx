import { Player } from "@/models/player.models";
import TeamPlayersPlayer from "./TeamPlayersPlayer";
import { useContext } from "react";
import { TeamStoreContext } from "@/app/teams/[teamId]/page";
import { useStore } from "zustand";
import { filterPlayersByPosition } from "@/utils/player.utils";


interface ITeamPlayersContainerProps {
  players: Player[];
}

const TeamPlayersContainer : React.FC<ITeamPlayersContainerProps> = ({ players }) => {
  const store = useContext(TeamStoreContext);
  const playersFilterValue = useStore(store, (state) => state.playersFilterValue);

  const filteredPlayers = filterPlayersByPosition(players, playersFilterValue);

  return (
    <div className="flex items-start w-full gap-[32px] flex-wrap">
      {filteredPlayers.map(player => (
        <TeamPlayersPlayer key={player.PERSON_ID} player={player} />
      ))}
    </div>
  );
}

export default TeamPlayersContainer;