import { TeamPost } from "@/models/team.models";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface ITodayPopularPostProps {
  post: TeamPost;
}

const TodayPopularPost = ({ post }: ITodayPopularPostProps) => {
  const router = useRouter();

  const handlePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/teams/${post.team_data.id}/posts/${post.id}`);
  }

  const teamKoreanName = post.team_data.teamname_set.find(name => name.language.name === "Korean")?.name || "";

  return (
    <div className="overflow-hidden rounded-md">
      <div className="p-[24px] bg-color3 rounded-md w-full flex flex-col gap-[24px]">
        <div className="w-full bg-color1 rounded-full p-[8px] flex items-center gap-[16px]">
          <div className="w-[24px] h-[24px] bg-white rounded-full relative">
            <Image
              className="w-[18px] h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
              src={`/logos/${post.team_data.symbol}.svg`}
              alt={post.team_data.symbol}
              width={24}
              height={24}
            />
          </div>
          <p className="text-[16px]"><span className="font-medium">{teamKoreanName}</span></p>
        </div>
        <div>
          <button 
            className="text-[16px] font-semibold"
            onClick={handlePostClick}
          >
            <h4 className="text-[16px] font-semibold">{post.title}</h4>
          </button>
          <div className="mt-[16px] flex items-center gap-[16px]">
            <div className="w-[40px] bg-transparent rounded-full relative my-[24px]">
              <Image
                className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
                src={`/logos/${post.user_data.favorite_team.symbol}.svg`}
                alt={post.user_data.favorite_team.symbol}
                width={20}
                height={20}
              />
            </div>
            <p className="text-[16px]">{post.user_data.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-[24px]"> 
          <div className="gap-[12px] flex items-center">
            {post.liked ? (
              <Image
                src={"/icons/favorite_fill_24dp_FFFFFF.svg"}
                alt="favorite"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src="/icons/thumb_up_24dp.svg"
                alt="like"
                width={24}
                height={24}
              />
            )}
            <p className="text-[16px]">
              {post.likes_count}
            </p>
          </div>
          <div className="gap-[12px] flex items-center">
            <Image
              src="/icons/thumb_up_24dp.svg"
              alt="like"
              width={24}
              height={24}
            />
            <p className="text-[16px]">
              {post.comments_count}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodayPopularPost;