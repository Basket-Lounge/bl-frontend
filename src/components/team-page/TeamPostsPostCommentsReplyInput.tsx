import { publishTeamPostCommentReply } from "@/api/team.api";
import { TeamPostCommentValidation } from "@/utils/validation.utils";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { PostCommentReplyContext } from "./TeamPostsPostCommentsItem";
import { useStore } from "zustand";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import ImageButton from "../common/ImageButton";


interface ITeamPostsPostCommentsReplyInputProps {
  commentId: string;
};

const TeamPostsPostCommentsReplyInput = ({
  commentId
}: ITeamPostsPostCommentsReplyInputProps) => {
  const [reply, setReply] = useState<string>("");
  const [replyError, setReplyError] = useState<string | null>(null);

  const { teamId, postId } = useParams();

  const store = useContext(PostCommentReplyContext);
  if (!store) {
    throw new Error("PostCommentReplyContext is not found");
  }

  const {
    updateReplyAdded
  } = useStore(store);

  // For submitting a reply to a comment
  const replyMutation = useMutation({
    mutationFn: (reply: string) => {
      return publishTeamPostCommentReply(
        teamId as string, 
        postId as string, 
        commentId,
        reply
      )
    },
    onSuccess: () => {
      setReply('');
      updateReplyAdded(true);
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const handleSubmitClick = () => {
    const validationResults = TeamPostCommentValidation.safeParse({content: reply});
    if (!validationResults.success) {
      const errorFormat = validationResults.error.format();
      
      const contentError = errorFormat.content?._errors.toString();
      setReplyError(contentError || '에러가 발생했습니다.');
      toast.error('댓글을 저장하는 중 오류가 발생했습니다.');
      return;
    }

    replyMutation.mutate(reply);
  };

  return (
    <div
      className="p-2.5 w-full bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
      aria-label="reply-input"
    >
      <textarea 
        rows={4}
        className="outline-none block w-full text-[16px] text-gray-900 bg-gray-50 rounded-lg  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white resize-none" 
        placeholder="댓글을 입력하세요."
        onChange={handleChange}
        value={reply}
        aria-label="reply-textarea"
      >
      </textarea>
      { reply && (
      <div className="mt-[8px] flex items-center justify-between">
        <div aria-invalid={replyError ? 'true' : 'false'} aria-errormessage="reply-submit-error">
          {replyMutation.isPending && <p className="mt-[16px] text-white">저장 중...</p>}
          {replyError && <p className="mt-[16px] text-red-500" id="reply-submit-error">{replyError}</p>}
        </div>
        <ImageButton
          className="bg-color1 text-white py-2 px-4 rounded-full"
          onClick={handleSubmitClick}
          disabled={replyMutation.isPending}
          pending={replyMutation.isPending}
          aria-label="reply-submit-button"
          aria-disabled={replyMutation.isPending}
        >
          저장
        </ImageButton>
      </div>
      )}
    </div>
  );
}

export default TeamPostsPostCommentsReplyInput;