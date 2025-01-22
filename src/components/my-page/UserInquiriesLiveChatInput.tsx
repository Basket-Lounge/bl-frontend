import { createInquiryMessage } from "@/api/user.api";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import RegularButton from "../common/RegularButton";


const UserInquiriesLiveChatInput = () => {
  const [ message, setMessage ] = useState<string>('');

  const searchParams = useSearchParams();
  const inquiryId = searchParams.get('inquiry') || '';

  const sendMessageMutation = useMutation({
    mutationFn: () => {
      return createInquiryMessage(inquiryId, message);
    },
    onSuccess: () => {
      setMessage('');
    }
  });

  const handleSendMessage = () => {
    if (!inquiryId) return;
    if (message.trim() === '') return;

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
      />

      <RegularButton
        onClick={handleSendMessage}
        pending={sendMessageMutation.isPending}
        disabled={sendMessageMutation.isPending}
        size="small"
      >
        전송
      </RegularButton>
    </div>
  )
}

export default UserInquiriesLiveChatInput;