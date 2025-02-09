import { useTeamStore } from "@/stores/teams.stores";
import { Player } from "@/models/player.models";
import { getPositionInKoreanFromAbbreviation } from "@/utils/player.utils";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface ITeamPlayersPlayerProps {
  player: Player;
}

const TeamPlayersPlayer : React.FC<ITeamPlayersPlayerProps> = ({ player }) => {
  const router = useRouter();

  const {
    updateCurrentPlayerId
  } = useTeamStore();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateCurrentPlayerId(player.id);
    router.push(`/teams/${player.team.id}/players/${player.id}`);
  }

  return (
    <div 
      className="flex flex-col gap-[24px] items-stretch p-[24px] rounded-md border border-white/25"
      aria-label="team-player"
    >
      <div className="flex items-center justify-between">
        <div className="text-[20px]" role="button" tabIndex={0} aria-label="player-name" onClick={handleClick}>
          <p aria-label="first-name">
            {player.first_name}
          </p>
          <p className="mt-[4px] font-bold" aria-label="last-name">
            {player.last_name}
          </p>
        </div>
        <div aria-label="player-info">
          <p className="text-[36px] text-center" role="button" tabIndex={0} onClick={handleClick} aria-label="player-jersey-number">
            {player.jersey_number || "-"}
          </p>
          <p className="text-center" role="button" tabIndex={0} onClick={handleClick} aria-label="player-position">
            {getPositionInKoreanFromAbbreviation(player.position)}
          </p>
        </div>
      </div>
      <div>
        <div className="w-[128px] h-[128px] overflow-hidden bg-white rounded-full relative mx-auto">
          <Image
            className="w-[100%] h-auto absolute bottom-0"
            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`}
            alt="player-image"
            width={1040}
            height={760}
          />
        </div> 
      </div>
      <div className="mt-[16px] flex gap-[32px] w-[90%] justify-between mx-auto">
        <div className="flex flex-col gap-[8px] items-center" aria-label="player-stats-points">
          <p className="text-white text-[16px] font-light">PTS</p>
          <p className="text-white text-[24px] font-medium">{player.pts?.toFixed(1) || '0.0'}</p>
        </div>
        <div className="flex flex-col gap-[8px] items-center" aria-label="player-stats-assists">
          <p className="text-white text-[16px] font-light">AST</p>
          <p className="text-white text-[24px] font-medium">{player.ast?.toFixed(1) || '0.0'}</p>
        </div>
        <div className="flex flex-col gap-[8px] items-center" aria-label="player-stats-rebounds">
          <p className="text-white text-[16px] font-light">REB</p>
          <p className="text-white text-[24px] font-medium">{player.reb?.toFixed(1) || '0.0'}</p>
        </div>
      </div>
    </div>
  )
}

export default TeamPlayersPlayer;