import UserDMsChatControlButtons from "./UserDMsChatControlButtons";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { timeAgoKorean } from "@/utils/common.utils";


interface IUserDMsChatHeaderProps {
  userId: number;
  username: string;
  updatedAt: string;
  userFavTeamSymbol?: string;
}

const UserDMsChatHeader = ({ userId, username, updatedAt, userFavTeamSymbol }: IUserDMsChatHeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('user');

    return params.toString()
  }, [searchParams])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(pathname + '?' + createQueryString());
  }

  const updatedAtKorean = timeAgoKorean(updatedAt);

  return (
    <div className="p-[24px] flex justify-between items-center relative">
      <button
        onClick={handleClick}
        className="absolute top-0 right-0 p-[8px] text-white"
      >
        <Image
          src="/icons/close_24dp_FFFFFF.svg"
          alt="close"
          width={24}
          height={24}
        />
      </button>
      <div className="flex gap-[24px] w-[calc(100%-72px)] xl:w-[calc(100%-88px)] items-center">
        {userFavTeamSymbol ? (
          <div className="w-[48px] xl:w-[64px] bg-transparent rounded-full relative text-black">
            <Image
              className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
              src={'/logos/' + userFavTeamSymbol + '.svg'} 
              alt="team-logo"
              width={20}
              height={20}
            />
          </div>
        ) : (
          <div className="w-[48px] h-[48px] xl:w-[64px] xl:h-[64px] bg-white rounded-full relative">
            <div className="w-full h-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center font-semibold text-[20px] text-color1">
              {username.slice(0, 1) || 'U'}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-[12px] xl:w-[calc(100%-88px)] w-[calc(100%-72px)]">
          <p className="font-medium text-[14px] xl:text-[16px] line-clamp-1 break-word">{username}</p>
          <p className="text-[14px]">{updatedAtKorean}</p>
        </div>
      </div>
      <UserDMsChatControlButtons userId={userId} />
    </div>
  )
}

export default UserDMsChatHeader;