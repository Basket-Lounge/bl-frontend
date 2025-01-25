import { TeamPostCommentReply } from "@/models/team.models";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface ITeamPostsPostCommentsReplyProps {
  reply: TeamPostCommentReply;
}

const TeamPostsPostCommentsReply = ({reply}: ITeamPostsPostCommentsReplyProps) => {
  const userFavTeamSymbol = reply.user_data.favorite_team?.symbol;
  const userFavTeamId = reply.user_data.favorite_team?.id;

  const router = useRouter();

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
    router.push("/users/" + reply.user_data.id + "/general-info");
  }

  const handleUserKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleUserClick();
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-[24px] px-[24px] py-[16px]">
      <div className="flex items-center gap-[24px]">
        {userFavTeamSymbol == null ? (
          <div 
            className="w-[32px] h-[32px] overflow-hidden rounded-full relative bg-white"
            aria-label="user-info"
            role="button"
            tabIndex={0}
            onClick={handleUserClick}
            onKeyDown={handleUserKeyDown}
          >
            <div 
              className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[16px] xl:text-[20px] text-color1"
              aria-label="user-username-initial"
            >
              {reply.user_data.username.slice(0, 1) || 'U'}
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
        <p className="text-white text-[14px]">{reply.user_data.username}</p>
      </div>
      <p className="text-white text-[14px] leading-4">{reply.content}</p>
    </div>
  );
}

export default TeamPostsPostCommentsReply;