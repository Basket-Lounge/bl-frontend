import { Player } from "@/models/player.models";
import TeamPlayersPlayer from "./TeamPlayersPlayer";
import { useContext } from "react";
import { TeamStoreContext, useTeamStore } from "@/stores/teams.stores";
import { useStore } from "zustand";
import { filterPlayersByPosition } from "@/utils/player.utils";
import TeamPlayersFilter from "./TeamPlayersFilter";


interface ITeamPlayersContainerProps {
  players: Player[];
}

const TeamPlayersContainer : React.FC<ITeamPlayersContainerProps> = ({ players }) => {
  // const store = useContext(TeamStoreContext);
  // const playersFilterValue = useStore(store, (state) => state.playersFilterValue);

  const {
    playersFilterValue
  } = useTeamStore();

  const filteredPlayers = filterPlayersByPosition(players, playersFilterValue);

  return (
    <div className="flex items-start w-full gap-[32px] flex-wrap">
      <TeamPlayersFilter />
      {filteredPlayers.map(player => (
        <TeamPlayersPlayer key={player.id} player={player} />
      ))}
    </div>
  );
}

export default TeamPlayersContainer;