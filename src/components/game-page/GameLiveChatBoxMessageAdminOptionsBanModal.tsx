'use client'

import { useCallback, useContext, useState } from "react";
import { useStore } from "zustand";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TDialogSize } from "@/models/common.models";
import { GameStoreContext } from "@/stores/games.stores";
import { updateUserBanInGameChat } from "@/api/admin.api";
import ImageButton from "../common/ImageButton";


interface IGameLiveChatBoxMessageAdminOptionsBanModalProps {
  gameId: string;
  userId: number;
  username: string;
  messageId: string;
}

const GameLiveChatBoxMessageAdminOptionsBanModal = (
  { gameId, userId, username, messageId }: IGameLiveChatBoxMessageAdminOptionsBanModalProps
) => {
  const store = useContext(GameStoreContext);
  const banUserModalOpen = useStore(store, (state) => state.banUserModalOpen);
  const setBanUserModalOpen = useStore(store, (state) => state.setBanUserModalOpen);

  const [reason, setReason] = useState<string>('');

  const handleOpen = (value: TDialogSize | null) => setBanUserModalOpen(value);

  const queryClient = useQueryClient();
  const banUserMutation = useMutation({
    mutationFn: (data: { reason: string | undefined }) => {
      return updateUserBanInGameChat(
        gameId,
        userId,
        true,
        data.reason,
        messageId
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["game", gameId, "chat-blacklist"]
      });
      handleOpen(null);
    }
  });

  const handleSubmit = useCallback(() => {
    banUserMutation.mutate({
      reason: reason || undefined,
    });
  }, [reason]);

  return (
    <Dialog 
      size={ banUserModalOpen || 'md' }
      handler={handleOpen} 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined} 
      open={banUserModalOpen !== null}
      className="bg-white"
    >
      <DialogHeader 
        color="blue"
        title="Dialog Header"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <h3 className="text-[16px] font-bold">유저 채팅 밴 추가</h3>
      </DialogHeader>
      <DialogBody 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        <div className="flex flex-col gap-[24px]">
          <div className="border border-black/50 rounded-full py-[8px] lg:py-[12px] px-[16px] lg:px-[20px] flex items-center text-[14px] lg:text-[16px]">
            <input
              aria-label="ban-reason"
              type="text"
              placeholder={`유저 ${username}을 밴할 이유를 입력하세요`}
              className="bg-transparent text-black outline-none grow"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
      </DialogBody>
      <DialogFooter 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
        className="flex justify-end gap-[16px]"
      >
        <ImageButton
          className="text-white rounded-md text-[14px] lg:text-[16px] font-semibold bg-green-500 p-[8px]"
          onClick={handleSubmit}
          pending={banUserMutation.isPending}
          disabled={banUserMutation.isPending}
          aria-disabled={banUserMutation.isPending}
          aria-label="ban-user"
        >
          밴
        </ImageButton>
        <ImageButton
          className="text-white rounded-md text-[14px] lg:text-[16px] font-semibold bg-red-500 p-[8px]"
          onClick={() => handleOpen(null)}
          disabled={banUserMutation.isPending}
          aria-disabled={banUserMutation.isPending}
          aria-label="cancel"
        >
          취소
        </ImageButton>
      </DialogFooter>
    </Dialog>
  );
}

export default GameLiveChatBoxMessageAdminOptionsBanModal;