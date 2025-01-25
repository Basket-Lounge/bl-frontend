import Image from "next/image";
import { useRouter } from "next/navigation";

interface TeamPostsPostCommentsItemUserProps {
  userData: {
    id: number;
    username: string;
    favorite_team: {
      id: number;
      symbol: string;
    } | null;
  };
}

const TeamPostsPostCommentsItemUser = ({ userData }: TeamPostsPostCommentsItemUserProps) => {
  const router = useRouter();

  const userFavTeamSymbol = userData.favorite_team?.symbol;
  const userFavTeamId = userData.favorite_team?.id;

  const handleTeamClick = () => {
    if (userFavTeamId === null) return
    router.push("/teams/" + userFavTeamId + "/general-info");
  }

  const handleTeamKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleTeamClick();
    }
  }

  const handleUserClick = () => {
    router.push("/users/" + userData.id + "/general-info");
  }

  const handleUserKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleUserClick();
    }
  }

  return (
    <div className="flex items-center gap-[24px]">
      {userFavTeamSymbol == null ? (
        <div 
          className="w-[32px] h-[32px] overflow-hidden rounded-full relative bg-white"
          aria-label="user-info"
        >
          <div 
            className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[14px] xl:text-[16px] text-color1"
            onClick={handleUserClick}
            onKeyDown={handleUserKeyDown}
            role="button"
            tabIndex={0}
            aria-label="user-username-initial"
          >
            {userData.username.slice(0, 1) || 'U'}
          </div>
        </div>
      ) : (
        <div 
          className="w-[32px] h-[32px] overflow-hidden rounded-full relative"
          role="button"
          aria-label="team-info"
          tabIndex={0}
          onClick={handleTeamClick}
          onKeyDown={handleTeamKeyDown}
        >
          <Image
            className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
            src={'/logos/' + userFavTeamSymbol + '.svg'} 
            alt="team-logo"
            width={20}
            height={20}
          />
        </div>
      )}
      <p 
        className="text-white text-[14px]"
        onClick={handleUserClick}
        onKeyDown={handleUserKeyDown}
        role="button"
        tabIndex={0}
        aria-label="user-username"
      >
        {userData.username}
      </p>
    </div>
  );
}

export default TeamPostsPostCommentsItemUser;