import { useEffect, useState } from "react";


interface ITeamPostsPostCommentsReplyInputProps {
  isMutating: boolean;
  handleMutation: (comment: string) => void;
};

const TeamPostsPostCommentsReplyInput = ({
  isMutating,
  handleMutation
}: ITeamPostsPostCommentsReplyInputProps) => {
  const [reply, setReply] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const handleSubmitClick = () => {
    handleMutation(reply);
  };

  useEffect(() => {
    if (!isMutating) {
      setReply("");
    }
  }, [isMutating]);

  return (
    <div
      className="p-2.5 w-full bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
    >
      <textarea 
        rows={4}
        className="outline-none block w-full text-[16px] text-gray-900 bg-gray-50 rounded-lg  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white resize-none" 
        placeholder="댓글을 입력하세요."
        onChange={handleChange}
        value={reply}
      >
      </textarea>
      { reply && (
      <div className="mt-[8px] flex items-center justify-between">
        <div>
        {isMutating && <p className="mt-[16px] text-white">저장 중...</p>}
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

export default TeamPostsPostCommentsReplyInput;