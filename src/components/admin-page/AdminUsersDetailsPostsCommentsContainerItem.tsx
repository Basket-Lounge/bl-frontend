'use client'

import { MyPageComment } from "@/models/user.models";
import { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/stores/modal.stores";
import { useStore } from "zustand";
import UserCommentsContainerContent from "../my-page/UserCommentsContainerContent";
import AdminUsersDetailsPostsCommentsContainerItemInput from "./AdminUsersDetailsPostsCommentsContainerItemInput";
import UserCommentsContainerEditDeleteButtonsContainer from "../my-page/UserCommentsContainerItemEditDeleteButtonsContainer";
import UserCommentsContainerItemLikesRepliesBox from "../my-page/UserCommentsContainerItemLikesRepliesBox";
import { useParams } from "next/navigation";
import { AdminPageStoreContext } from "@/app/admin/layout";
import TeamHeaderLikeButtonSpinner from "../team-page/TeamHeaderLikeButtonSpinner";


interface IAdminUsersDetailsPostsCommentsContainerItemProps {
  comment: MyPageComment;
}

const AdminUsersDetailsPostsCommentsContainerItem = ({ comment }: IAdminUsersDetailsPostsCommentsContainerItemProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [mutating, setMutating] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(comment.content);

  const store = useContext(AdminPageStoreContext);
  const setLastModifiedCommentId = useStore(store, (state) => state.setLastModifiedCommentId);

  const {
    userId
  } = useParams();

  const {
    openModal
  } = useModalStore();

  const queryClient = useQueryClient();
  const handleSuccessfulMutation = (newComment: string) => {
    queryClient.removeQueries({queryKey: ['my-page', "comments", "pagination"]});
    queryClient.removeQueries({queryKey: ['admin', 'users', userId as string, "comments", "pagination"]});
    queryClient.removeQueries({
      queryKey: [
        'team', 
        comment.post_data.team_data.id.toString(),
        'posts', 
        comment.post_data.id.toString(),
        'comments'
      ]
    });

    setEditedContent(newComment);
    setEditMode(false);
    setMutating(false);
  }

  const handleSuccessfulDeleteMutation = () => {
    queryClient.removeQueries({queryKey: ['my-page', "comments", "pagination"]});
    queryClient.removeQueries({queryKey: ['admin', 'users', userId as string, "comments", "pagination"]});
    queryClient.removeQueries({
      queryKey: [
        'team', 
        comment.post_data.team_data.id.toString(),
        'posts', 
        comment.post_data.id.toString(),
        'comments'
      ]
    });
    setLastModifiedCommentId(comment.id.toString());
  }

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditMode(!editMode);
  }

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal('admin-delete-comment', {
      userId: userId as string,
      commentId: comment.id,
      afterSuccessfulMutationCallback: handleSuccessfulDeleteMutation
    });
  }

  return (
    <div className="flex flex-col items-stretch gap-[24px] bg-color3 rounded-md p-[24px]">
      {mutating ? (
        <TeamHeaderLikeButtonSpinner />
      ) : (
        <UserCommentsContainerContent
          content={editedContent}
          teamId={comment.post_data.team_data.id.toString()}
          postId={comment.post_data.id}
        />
      )}
      {(editMode && !mutating) && (
        <AdminUsersDetailsPostsCommentsContainerItemInput
          userId={parseInt(userId as string)}
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

export default AdminUsersDetailsPostsCommentsContainerItem;