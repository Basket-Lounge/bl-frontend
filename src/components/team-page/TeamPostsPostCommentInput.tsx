import { publishTeamPostComment } from "@/api/team.api";
import { TeamPostCommentValidation } from "@/utils/validation.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";


interface IErrorData {
  error: {
    content: string[];
  } | Array<string>;
}

const TeamPostsPostCommentInput = () => {
  const [comment, setComment] = useState<string>("");
  const [commentError, setCommentError] = useState<string>("");

  const { teamId, postId } = useParams();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (comment: string) => {
      return publishTeamPostComment(
        teamId as string, 
        postId as string, 
        comment
      );
    },
    onSuccess: () => {
      queryClient.removeQueries({queryKey: ["team", teamId as string, "posts", "pagination"],});
      queryClient.removeQueries({queryKey: ['my-page', "posts", "pagination"]});
      queryClient.invalidateQueries({queryKey: ["team", teamId as string, "posts", postId as string, 'post'],});
      queryClient.invalidateQueries({queryKey: ["team", teamId as string, "posts", postId as string, 'comments'],});
      setComment("");
    },
    onError: (error: AxiosError<IErrorData | Array<string>>, variables, context) => {
      const errorData = error.response?.data;
      if (errorData && 'error' in errorData) {
        if (Array.isArray(errorData.error)) {
          setCommentError('알 수 없는 에러가 발생했습니다.');
          return;
        }

        const contentError = errorData.error.content.toString();
        setCommentError(contentError || '알 수 없는 에러가 발생했습니다.');
      } else {
        setCommentError('알 수 없는 에러가 발생했습니다.');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationResults = TeamPostCommentValidation.safeParse({content: comment});
    if (!validationResults.success) {
      const errorFormat = validationResults.error.format();
      
      const contentError = errorFormat.content?._errors.toString();
      setCommentError(contentError || '알 수 없는 에러가 발생했습니다.');

      return;
    }
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
          disabled={mutation.isPending}
        >
          {mutation.isPending ? '저장 중...' : '저장'}
        </button>
      </div>
      )}
    </div>
  );
}

export default TeamPostsPostCommentInput;