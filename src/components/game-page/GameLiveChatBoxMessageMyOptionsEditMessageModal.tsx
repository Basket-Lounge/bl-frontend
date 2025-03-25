'use client'

import { useCallback, useContext, useState } from "react";
import { useStore } from "zustand";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { TDialogSize } from "@/models/common.models";
import { GameStoreContext } from "@/stores/games.stores";
import ImageButton from "../common/ImageButton";
import { toast } from "react-toastify";
import { IGameChatMessage } from "@/models/game.models";
import { editGameChatMessage } from "@/api/game.api";


interface IGameLiveChatBoxMessageMyOptionsEditMessageModalProps {
  message: IGameChatMessage;
}

const GameLiveChatBoxMessageMyOptionsEditMessageModal = (
  { message }: IGameLiveChatBoxMessageMyOptionsEditMessageModalProps
) => {
  const [newMessage, setNewMessage] = useState<string>(message.message);

  const store = useContext(GameStoreContext);
  const editMessageModalOpen = useStore(store, (state) => state.editMessageModalOpen);
  const setEditMessageModalOpen = useStore(store, (state) => state.setEditMessageModalOpen);

  const handleOpen = (value: TDialogSize | null) => setEditMessageModalOpen(value);

  const editMessageMutation = useMutation({
    mutationFn: (newMessage: string) => {
      return editGameChatMessage(
        message.game,
        message.id,
        newMessage
      );
    },
    onSuccess: () => {
      handleOpen(null);
    },
  });

  const handleSubmit = useCallback(() => {
    if (!newMessage) {
      toast.error('메시지를 입력해주세요.');
      return;
    }

    if (newMessage === message.message) {
      toast.error('기존 메시지와 동일한 메시지는 수정할 수 없습니다.');
      return;
    }

    editMessageMutation.mutate(newMessage);
  }, [newMessage]);

  return (
    <Dialog 
      size={ editMessageModalOpen || 'md' }
      handler={handleOpen} 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined} 
      open={ editMessageModalOpen !== null }
      className="bg-white"
    >
      <DialogHeader 
        color="blue"
        title="Dialog Header"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <h3 className="text-[16px] font-bold">메시지 수정</h3>
      </DialogHeader>
      <DialogBody 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        <div className="flex flex-col gap-[24px]">
          <div className="border border-black/50 rounded-full py-[8px] lg:py-[12px] px-[16px] lg:px-[20px] flex items-center text-[14px] lg:text-[16px]">
            <input
              aria-label="edit-message"
              type="text"
              placeholder={`새로운 메시지를 입력해주세요.`}
              className="bg-transparent text-black outline-none grow"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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
          pending={editMessageMutation.isPending}
          disabled={editMessageMutation.isPending}
          aria-disabled={editMessageMutation.isPending}
          aria-label="edit"
        >
          수정
        </ImageButton>
        <ImageButton
          className="text-white rounded-md text-[14px] lg:text-[16px] font-semibold bg-red-500 p-[8px]"
          onClick={() => handleOpen(null)}
          disabled={editMessageMutation.isPending}
          aria-disabled={editMessageMutation.isPending}
          aria-label="cancel"
        >
          취소
        </ImageButton>
      </DialogFooter>
    </Dialog>
  );
}

export default GameLiveChatBoxMessageMyOptionsEditMessageModal;