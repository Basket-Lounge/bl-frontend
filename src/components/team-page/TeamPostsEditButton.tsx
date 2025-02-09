import { TeamStoreContext, useTeamStore } from "@/stores/teams.stores";
import { TeamPostStatus } from "@/models/team.models";
import { extractStatusKoreanName } from "@/utils/team.utils";
import { TeamPostValidation } from "@/utils/validation.utils";
import { useContext } from "react";
import { useStore } from "zustand";
import { toast } from "react-toastify";


interface ITeamPostsEditButtonProps {
  status: TeamPostStatus;
  callback: (title: string, content: string, status: number) => void;
}

const TeamPostsEditButton = ({
  status,
  callback,
}: ITeamPostsEditButtonProps) => {
  const {
    postsEditTitle: title,
    postsEditContent: content,
    updatePostsEditTitleError: setTitleError,
    updatePostsEditContentError: setContentError
  } = useTeamStore();

  const koreanName = extractStatusKoreanName(status);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationResults = TeamPostValidation.safeParse({title, content});
    if (!validationResults.success) {
      const errorFormat = validationResults.error.format();

      const titleError = errorFormat.title?._errors.toString()
      setTitleError(titleError || null);
      if (titleError) {
        toast.error(titleError);
      }

      const contentError = errorFormat.content?._errors.toString()
      setContentError(contentError || null);
      if (contentError) {
        toast.error(contentError);
      }

      return;
    }
    callback(title, content, status.id);
  }
  
  return (
    <button 
      className="bg-color1 text-white rounded-full py-[12px] px-[24px] font-semibold"
      onClick={handleClick}
    >
      {koreanName}
    </button> 
  );
}

export default TeamPostsEditButton;