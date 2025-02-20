'use client'

import { ChangeEventHandler, useContext, useMemo, useRef, useState } from "react";
import { useStore } from "zustand";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { TDialogSize } from "@/models/common.models";
import { GameStoreContext } from "@/stores/games.stores";
import { muteUserInGameChat } from "@/api/admin.api";
import ImageButton from "../common/ImageButton";
import { DayPicker } from "react-day-picker";
import useOutsideClick from "@/hooks/useOutsideClick";


interface IGameLiveChatBoxMessageAdminOptionsMuteModalProps {
  gameId: string;
  userId: number;
  username: string;
}

const GameLiveChatBoxMessageAdminOptionsMuteModal = (
  { gameId, userId, username }: IGameLiveChatBoxMessageAdminOptionsMuteModalProps
) => {
  const store = useContext(GameStoreContext);
  const muteUserModalOpen = useStore(store, (state) => state.muteUserModalOpen);
  const setMuteUserModalOpen = useStore(store, (state) => state.setMuteUserModalOpen);

  const dateInputRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState<Date | undefined>();
  const [timeValue, setTimeValue] = useState<string>("");
  const [dateSelectorOpen, setDateSelectorOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');

  useOutsideClick(
    dateInputRef, 
    dateSelectorOpen, 
    () => setDateSelectorOpen(false)
  );

  const localDateString = useMemo(() => {
    if (!date) {
      return '';
    }

    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`; 
  }, [date]);


  const handleOpen = (value: TDialogSize | null) => setMuteUserModalOpen(value);
  const muteUserMutation = useMutation({
    mutationFn: (data: { reason: string, muteUntil: number }) => {
      return muteUserInGameChat(
        gameId,
        userId,
        data.muteUntil,
        data.reason
      );
    },
    onSuccess: () => {
      handleOpen(null);
    }
  });

  const handleDaySelect = (selected: Date) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = new Date(selected.toLocaleString('en-US', { timeZone }));

    setDate(localDate);
  }

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!date) {
      setTimeValue("");
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    setTimeValue(`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`);
  };

  return (
    <Dialog 
      size={ muteUserModalOpen || 'md' }
      handler={handleOpen} 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined} 
      open={muteUserModalOpen !== null}
      className="bg-white"
    >
      <DialogHeader 
        color="blue"
        title="Dialog Header"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <h3 className="text-[16px] font-bold">유저 채팅 음소거</h3>
      </DialogHeader>
      <DialogBody 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        <div className="flex flex-col gap-[24px]">
          <div className="border border-black/50 rounded-full py-[8px] lg:py-[12px] px-[16px] lg:px-[20px] flex items-center text-[14px] lg:text-[16px]">
            <input
              aria-label="mute-reason"
              type="text"
              placeholder={`유저 ${username}을 음소거할 이유를 입력하세요`}
              className="bg-transparent text-black outline-none grow"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="w-full relative">
            <label
              className="text-black text-[14px] lg:text-[16px] font-semibold"
            >
              날짜
            </label>
            <div className="relative" ref={dateInputRef}>
              <div className="flex items-center gap-[16px]">
                <Input
                  value={date ? localDateString : ''}
                  onPointerEnterCapture={undefined} 
                  onPointerLeaveCapture={undefined} 
                  crossOrigin={undefined}
                  variant="static"
                  className="text-black text-[14px] lg:text-[16px]"
                  containerProps={{
                    className: "border-white peer-focus:border-white"
                  }}
                  onClick={() => setDateSelectorOpen(!dateSelectorOpen)}
                  aria-label="mute-date"
                />
                <input
                  type="time"
                  className="peer bg-white text-black outline-none text-[14px] lg:text-[16px]"
                  value={timeValue}
                  onChange={handleTimeChange}
                  aria-label="mute-time"
                />
              </div>
              {dateSelectorOpen && (
                <DayPicker
                  mode="single"
                  required={true}
                  selected={date}
                  onSelect={handleDaySelect}
                  className="absolute bg-white p-[16px] border border-black/50 rounded-md z-50"
                />
              )}
            </div>
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
          className="text-white rounded-md text-[14px] lg:text-[16px] font-semibold bg-red-500 p-[8px]"
          onClick={() => handleOpen(null)}
          disabled={muteUserMutation.isPending}
          aria-disabled={muteUserMutation.isPending}
        >
          취소
        </ImageButton>
      </DialogFooter>
    </Dialog>
  );
}

export default GameLiveChatBoxMessageAdminOptionsMuteModal;