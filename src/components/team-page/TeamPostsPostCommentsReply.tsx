import { TeamPostCommentReply } from "@/models/team.models";


interface ITeamPostsPostCommentsReplyProps {
  reply: TeamPostCommentReply;
}

const TeamPostsPostCommentsReply = ({reply}: ITeamPostsPostCommentsReplyProps) => {
  return (
    <div className="flex flex-col items-stretch gap-[24px] rounded-md bg-color4 p-[24px]">
      <div className="flex items-center gap-[24px]">
        <div className="bg-white rounded-full p-[20px]">
        </div>
        <p className="text-white text-[14px]">{reply.user_data.username}</p>
      </div>
      <p className="text-white text-[14px] leading-4">{reply.content}</p>
    </div>
  );
}

export default TeamPostsPostCommentsReply;