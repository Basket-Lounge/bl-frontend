import Image from "next/image";
import DropdownButton from "../common/DropdownButton";
import { IChatMuteEntry } from "@/models/admin.models";
import GameLiveChatBoxAdminManagementBoxMutesEntry from "./GameLiveChatBoxAdminManagementBoxMutesEntry";
import { useMemo, useState } from "react";


interface IGameLiveChatBoxAdminManagementBoxMutesProps {
  muteList: IChatMuteEntry[];
}

const GameLiveChatBoxAdminManagementBoxMutes = (
  { muteList }: IGameLiveChatBoxAdminManagementBoxMutesProps
) => {
  const [ search, setSearch ] = useState<string>("");
  const findUsers = useMemo(() => {
    if (search) {
      return muteList.filter(mute => mute.user_data.username.includes(search));
    }

    return muteList;
  }, [muteList, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="h-[300px] rounded-md border border-white/25 p-[24px] flex flex-col items-stretch gap-[16px]">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-[16px] font-bold">채팅 음소거 유저 목록 🔇</h3>
        <DropdownButton 
          emptyStyle={true}
          aria-label="post-actions"
        >
          <Image
            src="/icons/search_24dp_FFFFFF.svg"
            alt="ellipsis"
            width={20}
            height={20}
          />
          <div className="bg-white rounded-full py-[12px] px-[20px] flex items-center">
            <input
              type="text"
              placeholder="유저명을 입력하세요"
              className="bg-transparent text-black outline-none grow"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </DropdownButton>
      </div>
      <div className="flex flex-col items-stretch divide-y divide-white/25 border-t border-b border-white/25 overflow-y-auto">
        {findUsers.map((mute, index) => (
          <GameLiveChatBoxAdminManagementBoxMutesEntry
            key={index}
            mute={mute}
          />  
        ))}
      </div>
    </div>
  )
}

export default GameLiveChatBoxAdminManagementBoxMutes;