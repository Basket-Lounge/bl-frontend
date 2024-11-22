import { updatePostComment } from "@/api/admin.api";
import { editTeamPostComment } from "@/api/team.api";
import { TeamPostCommentValidation } from "@/utils/validation.utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";


interface IAdminUsersDetailsPostsCommentsContainerItemInputProps {
  content: string;
  userId: number;
  commentId: string;
  beforeMutationCallback?: () => void;
  afterSuccessfulMutationCallback?: (comment: string) => void;
  afterFailedMutationCallback?: () => void;
}

const AdminUsersDetailsPostsCommentsContainerItemInput = (
  { 
    commentId, 
    userId,
    content, 
    beforeMutationCallback,
    afterSuccessfulMutationCallback,
    afterFailedMutationCallback
  }: IAdminUsersDetailsPostsCommentsContainerItemInputProps
) => {
  const [comment, setComment] = useState<string>(content);
  const [commentError, setCommentError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: (comment: string) => {
      return updatePostComment(userId, commentId, {
        content: comment
      });
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

export default AdminUsersDetailsPostsCommentsContainerItemInput;