import { TeamStoreContext } from "@/app/teams/[teamId]/layout";
import { TeamPostStatus } from "@/models/team.models";
import { extractStatusKoreanName } from "@/utils/team.utils";
import { TeamPostValidation } from "@/utils/validation.utils";
import { useContext } from "react";
import { useStore } from "zustand";


interface ITeamPostsCreateButtonProps {
  status: TeamPostStatus;
  callback: (title: string, content: string, status: number) => void;
}

const TeamPostsCreateButton = ({
  status,
  callback,
}: ITeamPostsCreateButtonProps) => {
  const store = useContext(TeamStoreContext);
  const title = useStore(store, (state) => state.postsCreateTitle);
  const content = useStore(store, (state) => state.postsCreateContent);
  const setTitleError = useStore(store, (state) => state.updatePostsCreateTitleError);
  const setContentError = useStore(store, (state) => state.updatePostsCreateContentError);

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

export default TeamPostsCreateButton;