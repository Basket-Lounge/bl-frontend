import { getUserInfo } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import TeamHeaderLikeButtonSpinner from "../team-page/TeamHeaderLikeButtonSpinner";


const UserGeneralInfoIntroduction = () => {
  const { userId } = useParams();
  const userInfoQuery = useQuery({
    queryKey: ["users", userId as string, "user-info"], 
    queryFn: async () => {
      return await getUserInfo(parseInt(userId as string));
    }
  });

  if (userInfoQuery.isLoading || userInfoQuery.isRefetching) {
    return (
      <div className="w-full">
        <label className="text-white text-[20px] font-bold block">자기 소개</label>
        <div className="p-[16px] flex flex-col gap-[16px] items-center justify-center">
          <TeamHeaderLikeButtonSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <label className="text-white text-[20px] font-bold block">자기 소개</label>
      <p className="mt-[16px] text-[16px]">{userInfoQuery.data!.introduction}</p>
    </div>
  );
}

export default UserGeneralInfoIntroduction;