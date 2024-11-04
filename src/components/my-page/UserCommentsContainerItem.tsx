'use client'

import { MyPageComment } from "@/models/user.models";
import UserCommentsContainerEditDeleteButtonsContainer from "./UserCommentsContainerItemEditDeleteButtonsContainer";
import { useContext, useState } from "react";
import UserCommentsContainerContent from "./UserCommentsContainerContent";
import UserCommentsContainerItemLikesRepliesBox from "./UserCommentsContainerItemLikesRepliesBox";
import UserCommentsContainerItemInput from "./UserCommentsContainerItemInput";
import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/stores/modal.stores";
import { MyPageStoreContext } from "@/app/my-page/layout";
import { useStore } from "zustand";


interface IUserCommentsContainerItemProps {
  comment: MyPageComment;
}

const UserCommentsContainerItem = ({ comment }: IUserCommentsContainerItemProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [mutating, setMutating] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(comment.content);

  const store = useContext(MyPageStoreContext);
  const updateCommentsDeleted = useStore(store, (state) => state.setCommentsDeleted);

  const {
    openModal
  } = useModalStore();

  const queryClient = useQueryClient();
  const handleSuccessfulMutation = (comment: string) => {
    queryClient.removeQueries({queryKey: ['my-page', "comments", "pagination"]});
    setEditedContent(comment);
    setEditMode(false);
    setMutating(false);
  }

  const handleSuccessfulDeleteMutation = () => {
    queryClient.removeQueries({queryKey: ['my-page', "comments", "pagination"]});
    queryClient.removeQueries({
      queryKey: [
        'team', 
        comment.post_data.team_data.id.toString(),
        'posts', 
        comment.post_data.id.toString(),
        'comments'
      ]
    });
    updateCommentsDeleted(true);
  }

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditMode(!editMode);
  }

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal('delete-comment', {
      teamId: comment.post_data.team_data.id,
      postId: comment.post_data.id,
      commentId: comment.id,
      afterSuccessfulMutationCallback: handleSuccessfulDeleteMutation
    });
  }

  return (
    <div className="flex flex-col items-stretch gap-[24px] bg-color3 rounded-md p-[24px]">
      <UserCommentsContainerContent
        content={editedContent}
        teamId={comment.post_data.team_data.id.toString()}
        postId={comment.post_data.id}
      />
      {editMode && (
        <UserCommentsContainerItemInput
          teamId={comment.post_data.team_data.id.toString()}
          postId={comment.post_data.id}
          commentId={comment.id}
          content={editedContent}
          beforeMutationCallback={() => setMutating(true)}
          afterSuccessfulMutationCallback={handleSuccessfulMutation}
          afterFailedMutationCallback={() => setMutating(false)}
        />
      )}
      <hr className="border border-white opacity-[25%]" />
      <div className="flex justify-between items-center gap-[16px]">
        <p className="text-white text-[16px] font-semibold line-clamp-1">{comment.post_data.title}</p>
        {!mutating && (
          <UserCommentsContainerEditDeleteButtonsContainer
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
          />
        )}
      </div>
      <div className="flex items-center gap-[16px]">
        <div className="p-[20px] rounded-full bg-white"></div>
        <span className="text-white text-[14px] line-clamp-1">
          {comment.post_data.user_data.username}
        </span>
      </div>
      <UserCommentsContainerItemLikesRepliesBox
        likesCount={comment.likes_count}
        repliesCount={comment.replies_count}
        liked={comment.liked || false}
      />
    </div>
  );
}

export default UserCommentsContainerItem;