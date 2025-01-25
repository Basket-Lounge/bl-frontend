import { TeamPost } from "@/models/team.models";
import Image from "next/image";


interface TeamGeneralInfoPopularPostsItemProps {
  post: TeamPost;
}

const TeamGeneralInfoPopularPostsItem = (
  { post }: TeamGeneralInfoPopularPostsItemProps
) => {
  return (
    <li className="p-[24px] rounded-md bg-color3 block">
      <h3 className="text-[16px] font-semibold">
        {post.title}
      </h3>
      <div className="flex items-center gap-[16px] mt-[16px]">
        <div className="bg-white w-[32px] h-[32px] rounded-full">
        </div>
        <p className="text-[14px]">{post.user_data.username}</p>
        <p className="text-[14px]">{post.created_at}</p>
      </div>
      <div className="flex items-center gap-[24px] mt-[16px]"> 
        <div className="gap-[12px] flex items-center">
          <Image
            src="/icons/thumb_up_24dp.svg"
            alt="like"
            width={20}
            height={20}
          />
          <p className="text-[16px]">
            {post.likes_count}
          </p>
        </div>
        <div className="gap-[12px] flex items-center">
          <Image
            src="/icons/thumb_up_24dp.svg"
            alt="like"
            width={20}
            height={20}
          />
          <p className="text-[16px]">
            {post.comments_count}
          </p>
        </div>
      </div>
    </li>
  )
}

export default TeamGeneralInfoPopularPostsItem;