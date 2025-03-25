import { IGameChatMessage } from "@/models/game.models";
import ImageButton from "../common/ImageButton";
import { useContext } from "react";
import { GameStoreContext } from "@/stores/games.stores";
import { useStore } from "zustand";
import GameLiveChatBoxMessageMyOptionsEditMessageModal from "./GameLiveChatBoxMessageMyOptionsEditMessageModal";
import { useMutation } from "@tanstack/react-query";
import { deleteGameChatMessage } from "@/api/game.api";


const GameLiveChatBoxMessageMyOptions = (
  { message } : { message: IGameChatMessage }
) => {
  const store = useContext(GameStoreContext);
  const setEditMessageModalOpen = useStore(store, (state) => state.setEditMessageModalOpen);

  const handleEditClick = () => {
    setEditMessageModalOpen('md');
  }

  const deleteMessageMutation = useMutation({
    mutationFn: () => {
      return deleteGameChatMessage(message.game, message.id);
    },
  });

  const handleDeleteClick = () => {
    deleteMessageMutation.mutate();
  }

  return (
    <div className="bg-white rounded-full p-[16px] flex flex-col items-start gap-[16px]">
      <ImageButton
        onClick={handleEditClick}
        className="text-black rounded-md text-[14px] lg:text-[16px]"
        aria-label="edit-message"
        disabled={deleteMessageMutation.isPending}
        aria-disabled={deleteMessageMutation.isPending}
      >
        수정
      </ImageButton>
      <ImageButton
        onClick={handleDeleteClick}
        className="text-black rounded-md text-[14px] lg:text-[16px]"
        aria-label="delete-message"
        disabled={deleteMessageMutation.isPending}
        pending={deleteMessageMutation.isPending}
        aria-disabled={deleteMessageMutation.isPending}
      >
        삭제
      </ImageButton>
      <GameLiveChatBoxMessageMyOptionsEditMessageModal message={message} />
    </div>
  );
};

export default GameLiveChatBoxMessageMyOptions;