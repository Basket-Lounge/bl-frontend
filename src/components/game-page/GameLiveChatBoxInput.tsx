import { sendGameChatMessage } from "@/api/game.api";
import { GameStoreContext } from "@/stores/games.stores";
import { timeUntilKorean } from "@/utils/common.utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "zustand";
import ImageButton from "../common/ImageButton";


const GameLiveChatBoxInput = () => {
  const { gameId } = useParams();
  const [ message, setMessage ] = useState<string>('');
  const [ nextAllowedMessageDate, setNextAllowedMessageDate ] = useState<Date | null>(null);

  const store = useContext(GameStoreContext);
  const subscriptionToken = useStore(store, (state) => state.subscriptionToken);

  const sendMessageMutation = useMutation({
    mutationFn: () => {
      if (nextAllowedMessageDate && nextAllowedMessageDate > new Date()) {
        toast.error(`다음 메시지 전송 가능 시간은 ${timeUntilKorean(nextAllowedMessageDate)} 입니다.`);
        return Promise.reject();
      }

      return sendGameChatMessage(
        gameId as string, 
        message,
        subscriptionToken as string
      );
    },
    onSuccess: (data) => {
      setNextAllowedMessageDate(new Date(data.next_message_datetime));
      setMessage('');
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const errorMessage = error.response?.data?.error;
      if (errorMessage === undefined) {
        toast.error('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (errorMessage.includes('Muted')) {
        toast.error('채팅에서 영구적으로 음소거되었습니다.');
        return;
      }

      if (errorMessage.includes('Banned')) {
        toast.error('채팅에서 영구적으로 밴되었습니다.');
        return;
      }
      
      setNextAllowedMessageDate(new Date(errorMessage));
      const timeUntil = timeUntilKorean(errorMessage);
      toast.error(`채팅에서 ${timeUntil}에 음소거 해제됩니다.`);
    }
  });

  const handleSendMessageClick = () => {
    sendMessageMutation.mutate();
  }

  return (
    <div className="border border-white rounded-full py-[8px] lg:py-[12px] px-[20px] flex items-center">
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        className="bg-transparent text-white outline-none grow"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <ImageButton
        className="bg-color1 text-white rounded-full px-[16px] py-[8px] ml-[16px]"
        onClick={handleSendMessageClick}
        disabled={sendMessageMutation.isPending || message.length === 0}
        pending={sendMessageMutation.isPending}
        aria-label="send-message"
        aria-disabled={sendMessageMutation.isPending || message.length === 0}
      >
        전송
      </ImageButton>
    </div>
  )
}

export default GameLiveChatBoxInput;