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
import { setSlowModeGameChat } from "@/api/admin.api";
import ImageButton from "../common/ImageButton";
import { toast } from "react-toastify";


interface IGameLiveChatBoxMessageAdminOptionsSlowDownModalProps {
  gameId: string;
}

const GameLiveChatBoxMessageAdminOptionsSlowDownModal = (
  { gameId }: IGameLiveChatBoxMessageAdminOptionsSlowDownModalProps
) => {
  const store = useContext(GameStoreContext);
  const slowDownModalOpen = useStore(store, (state) => state.slowDownModalOpen);
  const setSlowDownModalOpen = useStore(store, (state) => state.setSlowDownModalOpen);

  const [seconds, setSeconds] = useState<number>(0);

  const handleOpen = (value: TDialogSize | null) => setSlowDownModalOpen(value);

  const queryClient = useQueryClient();
  const muteUserMutation = useMutation({
    mutationFn: (data: { seconds: number | undefined }) => {
      return setSlowModeGameChat(
        gameId,
        true,
        data.seconds,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["game", gameId, "chat-blacklist"]
      });
      handleOpen(null);
    }
  });

  const handleSubmit = useCallback(() => {
    if (seconds <= 0) {
      toast.error('초를 입력해주세요.');
      return;
    }

    muteUserMutation.mutate({
      seconds,
    });
  }, [seconds]);

  return (
    <Dialog 
      size={ slowDownModalOpen || 'md' }
      handler={handleOpen} 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined} 
      open={ slowDownModalOpen !== null }
      className="bg-white"
    >
      <DialogHeader 
        color="blue"
        title="Dialog Header"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <h3 className="text-[16px] font-bold">슬로우 모드 설정</h3>
      </DialogHeader>
      <DialogBody 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        <div className="flex flex-col gap-[24px]">
          <div className="border border-black/50 rounded-full py-[8px] lg:py-[12px] px-[16px] lg:px-[20px] flex items-center text-[14px] lg:text-[16px]">
            <input
              aria-label="slow-down-seconds"
              type="number"
              placeholder={`초를 입력해주세요.`}
              className="bg-transparent text-black outline-none grow"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
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
          pending={muteUserMutation.isPending}
          disabled={muteUserMutation.isPending}
          aria-disabled={muteUserMutation.isPending}
          aria-label="mute-user"
        >
          슬로우 모드 적용
        </ImageButton>
        <ImageButton
          className="text-white rounded-md text-[14px] lg:text-[16px] font-semibold bg-red-500 p-[8px]"
          onClick={() => handleOpen(null)}
          disabled={muteUserMutation.isPending}
          aria-disabled={muteUserMutation.isPending}
          aria-label="cancel"
        >
          취소
        </ImageButton>
      </DialogFooter>
    </Dialog>
  );
}

export default GameLiveChatBoxMessageAdminOptionsSlowDownModal;