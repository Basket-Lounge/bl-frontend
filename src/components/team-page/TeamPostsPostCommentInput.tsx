import { publishTeamPostComment } from "@/api/team.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";


const TeamPostsPostCommentInput = () => {
  const [comment, setComment] = useState<string>("");
  const { teamId, postId } = useParams();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (comment: string) => {
      return publishTeamPostComment(teamId as string, postId as string, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["team", teamId as string, "posts", postId as string],});
      setComment("");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitClick = () => {
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

export default TeamPostsPostCommentInput;