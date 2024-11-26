import { TeamPost } from "@/models/team.models";
import Image from "next/image";


interface ITodayPopularPostProps {
  post: TeamPost;
}

const TodayPopularPost = ({ post }: ITodayPopularPostProps) => {
  return (
    <div className="overflow-hidden rounded-md">
      <div className="p-[24px] bg-color3 rounded-md w-full flex flex-col gap-[24px]">
        <div>
          <h4 className="text-[16px] font-semibold">{post.title}</h4>
          <div className="mt-[16px] flex items-center gap-[16px]">
            <div className="rounded-full bg-white w-[40px] h-[40px]">
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