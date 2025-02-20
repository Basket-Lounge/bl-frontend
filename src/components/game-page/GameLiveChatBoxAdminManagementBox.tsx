import { useQuery } from "@tanstack/react-query";
import GameLiveChatBoxAdminManagementBoxBans from "./GameLiveChatBoxAdminManagementBoxBans";
import GameLiveChatBoxAdminManagementBoxMutes from "./GameLiveChatBoxAdminManagementBoxMutes";
import { getGameChatBanList } from "@/api/admin.api";
import { useParams } from "next/navigation";
import SpinnerLoading from "../common/SpinnerLoading";
import CuteErrorMessage from "../common/CuteErrorMessage";


const GameLiveChatBoxAdminManagementBox = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const chatBlacklistQuery = useQuery({
    queryKey: ["game", gameId, "chat-blacklist"],
    queryFn: async () => {
      return await getGameChatBanList(gameId);
    },
    retry: 2
  });

  if (chatBlacklistQuery.isLoading) {
    return <SpinnerLoading />;
  }

  if (chatBlacklistQuery.isError || !chatBlacklistQuery.data) {
    return (
      <CuteErrorMessage
        error="채팅 관리 정보를 불러오는 중 오류가 발생했습니다. 새로고침을 시도해주세요."
        size="small"
      />
    );
  }

  return (
    <div className="gap-[16px] flex flex-col items-stretch lg:grid grid-cols-2">
      <GameLiveChatBoxAdminManagementBoxBans banList={chatBlacklistQuery.data.bans} />
      <GameLiveChatBoxAdminManagementBoxMutes muteList={chatBlacklistQuery.data.mutes} />
    </div>
  )
}

export default GameLiveChatBoxAdminManagementBox;