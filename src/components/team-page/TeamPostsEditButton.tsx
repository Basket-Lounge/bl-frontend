import { TeamStoreContext, useTeamStore } from "@/stores/teams.stores";
import { TeamPostStatus } from "@/models/team.models";
import { extractStatusKoreanName } from "@/utils/team.utils";
import { TeamPostValidation } from "@/utils/validation.utils";
import { useContext } from "react";
import { useStore } from "zustand";


interface ITeamPostsEditButtonProps {
  status: TeamPostStatus;
  callback: (title: string, content: string, status: number) => void;
}

const TeamPostsEditButton = ({
  status,
  callback,
}: ITeamPostsEditButtonProps) => {
  // const store = useContext(TeamStoreContext);
  // const title = useStore(store, (state) => state.postsEditTitle);
  // const content = useStore(store, (state) => state.postsEditContent);
  // const setTitleError = useStore(store, (state) => state.updatePostsEditTitleError);
  // const setContentError = useStore(store, (state) => state.updatePostsEditContentError);
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

      const contentError = errorFormat.content?._errors.toString()
      setContentError(contentError || null);

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