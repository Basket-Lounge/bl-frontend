import { createUserChatMessage } from "@/api/user.api";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import RegularButton from "../common/RegularButton";
import { toast } from "react-toastify";


const UserDMsChatInput = () => {
  const [ message, setMessage ] = useState<string>('');

  const searchParams = useSearchParams();
  const userId = parseInt(searchParams.get('user') || '');

  const sendMessageMutation = useMutation({
    mutationFn: () => {
      return createUserChatMessage(userId, message);
    },
    onSuccess: () => {
      setMessage('');
    },
    onError: () => {
      toast.error('메시지 전송에 실패했습니다. 다시 시도해주세요.');
    }
  });

  const handleSendMessage = () => {
    if (isNaN(userId)) return;

    sendMessageMutation.mutate();
  };

  return (
    <div className="border border-white rounded-full py-[8px] xl:py-[12px] px-[20px] flex items-center">
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        className="bg-transparent text-white outline-none grow xl:text-[16px] text-[14px]"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={sendMessageMutation.isPending}
        aria-label="chat-input"
      />
      <RegularButton
        onClick={handleSendMessage}
        pending={sendMessageMutation.isPending}
        disabled={sendMessageMutation.isPending}
        size="small"
        aria-label="send-message-button"
        aria-disabled={sendMessageMutation.isPending}
      >
        전송
      </RegularButton>
    </div>
  )
}

export default UserDMsChatInput;