import { editTeamPostComment, publishTeamPostCommentReply } from "@/api/team.api";
import { TeamPostCommentValidation } from "@/utils/validation.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


interface IUserCommentsContainerItemInputProps {
  content: string;
  teamId: string;
  postId: string;
  commentId: string;
  beforeMutationCallback?: () => void;
  afterSuccessfulMutationCallback?: (comment: string) => void;
  afterFailedMutationCallback?: () => void;
}

const UserCommentsContainerItemInput = (
  { 
    teamId, 
    postId, 
    commentId, 
    content, 
    beforeMutationCallback,
    afterSuccessfulMutationCallback,
    afterFailedMutationCallback
  }: IUserCommentsContainerItemInputProps
) => {
  const [comment, setComment] = useState<string>(content);
  const [commentError, setCommentError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: (comment: string) => {
      return editTeamPostComment(
        teamId as string, 
        postId as string, 
        commentId,
        comment
      );
    },
    onSuccess: () => {
      afterSuccessfulMutationCallback && afterSuccessfulMutationCallback(comment);
    },
    onError: () => {
      setCommentError("댓글 수정 중 오류가 발생했습니다.");
      setComment(content);
      afterFailedMutationCallback && afterFailedMutationCallback();
    }
  });

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationResults = TeamPostCommentValidation.safeParse({content: comment});
    if (!validationResults.success) {
      const errorFormat = validationResults.error.format();
      
      const contentError = errorFormat.content?._errors.toString();
      setCommentError(contentError || '알 수 없는 에러가 발생했습니다.');

      return;
    }

    setCommentError("");

    beforeMutationCallback && beforeMutationCallback();
    mutation.mutate(comment);
  };

  return (
    <div
      className="p-2.5 w-full bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
    >
      <textarea 
        rows={4}
        className="outline-none block w-full text-[16px] text-gray-900 bg-gray-50 rounded-lg  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white resize-none" 
        placeholder="댓글을 입력하세요."
        onChange={handleChange}
        value={comment}
      >
      </textarea>
      { comment && (
      <div className="mt-[8px] flex items-center justify-between">
        <div>
        {commentError && <p className="mt-[16px] text-red-500">{commentError}</p>}
        {mutation.isPending && <p className="mt-[16px] text-white">저장 중...</p>}
        {mutation.isError && <p className="mt-[16px] text-white">저장 중 오류가 발생했습니다.</p>}
        {mutation.isSuccess && <p className="mt-[16px] text-white">저장되었습니다.</p>}
        </div>
        <button 
          className="bg-color1 text-white py-2 px-4 rounded-full"
          onClick={handleSubmitClick}
        >
          댓글 등록
        </button>
      </div>
      )}
    </div>
  );
}

export default UserCommentsContainerItemInput;