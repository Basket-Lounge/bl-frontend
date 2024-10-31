interface TeamPostsPostCommentsItemUserProps {
  userData: {
    id: number;
    username: string;
  };
}

const TeamPostsPostCommentsItemUser = ({ userData }: TeamPostsPostCommentsItemUserProps) => {
  return (
    <div className="flex items-center gap-[24px]">
      <div className="bg-white rounded-full p-[20px]">
      </div>
      <p className="text-white text-[14px]">{userData.username}</p>
    </div>
  );
}

export default TeamPostsPostCommentsItemUser;