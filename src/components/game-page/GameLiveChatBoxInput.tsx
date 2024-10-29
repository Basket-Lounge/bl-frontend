import { sendGameChatMessage } from "@/api/game.api";
import { GameStoreContext } from "@/app/games/[gameId]/layout";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { useStore } from "zustand";


const GameLiveChatBoxInput = () => {
  const { gameId } = useParams();

  const [ message, setMessage ] = useState<string>('');
  const [ isSending, setIsSending ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);

  const store = useContext(GameStoreContext);
  const subscriptionToken = useStore(store, (state) => state.subscriptionToken);

  const handleSendMessageClick = async () => {
    setIsSending(true);
    setError(null);
    
    const status = await sendGameChatMessage(
      gameId as string, 
      message,
      subscriptionToken as string
    );

    if (status !== 201) {
      setError("메시지 전송에 실패했습니다.");
    }

    setMessage('');
    setIsSending(false);
  }

  return (
    <div className="border border-white rounded-full py-[12px] px-[20px] flex items-center">
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        className="bg-transparent text-white outline-none grow"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button 
        className="bg-color1 text-white rounded-full px-[16px] py-[8px] ml-[16px]"
        onClick={(e) => handleSendMessageClick()}
      >
        전송
      </button>
    </div>
  )
}

export default GameLiveChatBoxInput;