'use client'

import { ChangeEventHandler, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useStore } from "zustand";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TDialogSize } from "@/models/common.models";
import { GameStoreContext } from "@/stores/games.stores";
import { setMuteModeGameChat } from "@/api/admin.api";
import ImageButton from "../common/ImageButton";
import { DayPicker } from "react-day-picker";
import useOutsideClick from "@/hooks/useOutsideClick";
import { formatDateInUTC } from "@/utils/common.utils";


interface IGameLiveChatBoxMessageAdminOptionsMuteEveryoneModalProps {
  gameId: string;
}

const GameLiveChatBoxMessageAdminOptionsMuteEveryoneModal = (
  { gameId }: IGameLiveChatBoxMessageAdminOptionsMuteEveryoneModalProps
) => {
  const store = useContext(GameStoreContext);
  const muteEveryoneModalOpen = useStore(store, (state) => state.muteEveryoneModalOpen);
  const setMuteEveryoneModalOpen = useStore(store, (state) => state.setMuteEveryoneModalOpen);

  const dateInputRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState<Date | undefined>();
  const [timeValue, setTimeValue] = useState<string>("");
  const [dateSelectorOpen, setDateSelectorOpen] = useState<boolean>(false);

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


  const handleOpen = (value: TDialogSize | null) => setMuteEveryoneModalOpen(value);

  const queryClient = useQueryClient();
  const muteUserMutation = useMutation({
    mutationFn: (data: { muteUntil: string | undefined }) => {
      return setMuteModeGameChat(
        gameId,
        true,
        data.muteUntil
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["game", gameId, "chat-blacklist"]
      });
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

  const handleSubmit = useCallback(() => {
    let newDate: Date | undefined = undefined;

    if (date) {
      const time = timeValue.split(":");
      newDate = new Date(date);

      if (time.length === 2) {
        newDate.setHours(parseInt(time[0], 10));
        newDate.setMinutes(parseInt(time[1], 10));
      }
    }

    muteUserMutation.mutate({
      muteUntil: newDate ? formatDateInUTC(newDate) : undefined
    });
  }, [date, timeValue]);

  return (
    <Dialog 
      size={ muteEveryoneModalOpen || 'md' }
      handler={handleOpen} 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined} 
      open={muteEveryoneModalOpen !== null}
      className="bg-white"
    >
      <DialogHeader 
        color="blue"
        title="Dialog Header"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <h3 className="text-[16px] font-bold">전체 채팅 음소거</h3>
      </DialogHeader>
      <DialogBody 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        <div className="flex flex-col gap-[24px]">
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
          className="text-white rounded-md text-[14px] lg:text-[16px] font-semibold bg-green-500 p-[8px]"
          onClick={handleSubmit}
          pending={muteUserMutation.isPending}
          disabled={muteUserMutation.isPending}
          aria-disabled={muteUserMutation.isPending}
          aria-label="mute-user"
        >
          음소거
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

export default GameLiveChatBoxMessageAdminOptionsMuteEveryoneModal;