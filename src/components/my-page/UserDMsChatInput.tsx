import { createUserChatMessage } from "@/api/user.api";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useContext, useState } from "react";


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
    }
  });

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isNaN(userId)) return;

    sendMessageMutation.mutate();
  };

  return (
    <div className="border border-white rounded-full py-[12px] px-[20px] flex items-center">
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        className="bg-transparent text-white outline-none grow"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={sendMessageMutation.isPending}
      />
      <button 
        className="bg-color1 text-white rounded-full px-[16px] py-[8px] ml-[16px]"
        onClick={handleSendMessage}
        disabled={sendMessageMutation.isPending}
      >
        {sendMessageMutation.isPending ? '전송중...' : '전송'}
      </button>
    </div>
  )
}

export default UserDMsChatInput;