import GameLiveChatBoxAdminManagementBoxBans from "./GameLiveChatBoxAdminManagementBoxBans";
import GameLiveChatBoxAdminManagementBoxMutes from "./GameLiveChatBoxAdminManagementBoxMutes";
import SpinnerLoading from "../common/SpinnerLoading";
import CuteErrorMessage from "../common/CuteErrorMessage";
import { useContext } from "react";
import { GameStoreContext } from "@/stores/games.stores";
import { useStore } from "zustand";


const GameLiveChatBoxAdminManagementBox = () => {
  const store = useContext(GameStoreContext);
  const gameChatBlacklist = useStore(store, (state) => state.gameChatBlacklist);
  const gameChatBlacklistError = useStore(store, (state) => state.gameChatBlacklistError);
  const gameChatBlacklistLoading = useStore(store, (state) => state.gameChatBlacklistLoading);


  if (gameChatBlacklistLoading) {
    return <SpinnerLoading />;
  }

  if (gameChatBlacklistError) {
    return (
      <CuteErrorMessage
        error="채팅 관리 정보를 불러오는 중 오류가 발생했습니다. 새로고침을 시도해주세요."
        size="small"
      />
    );
  }

  return (
    <div className="gap-[16px] flex flex-col items-stretch lg:grid grid-cols-2">
      <GameLiveChatBoxAdminManagementBoxBans banList={gameChatBlacklist.bans} />
      <GameLiveChatBoxAdminManagementBoxMutes muteList={gameChatBlacklist.mutes} />
    </div>
  )
}

export default GameLiveChatBoxAdminManagementBox;