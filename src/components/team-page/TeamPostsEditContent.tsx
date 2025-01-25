import { TeamStoreContext, useTeamStore } from "@/stores/teams.stores";
import { useContext } from "react";
import { useStore } from "zustand";


const TeamPostsEditContent = () => {
  // const store = useContext(TeamStoreContext);
  // const content = useStore(store, (state) => state.postsEditContent);
  // const setContent = useStore(store, (state) => state.updatePostsEditContent);
  // const contentError = useStore(store, (state) => state.postsEditContentError);
  const {
    postsEditContent: content,
    updatePostsEditContent: setContent,
    postsEditContentError: contentError
  } = useTeamStore();

  return (
    <div className="flex flex-col items-stretch gap-[16px]">
      {contentError && (
        <p className="text-red-500 font-semibold text-[16px]">{contentError}</p>
      )}
      <textarea
        placeholder="내용을 입력하세요"
        className="bg-color3 p-[24px] text-white outline-none grow placeholder:font-semibold text-[16px] h-[750px] resize-none rounded-md"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}

export default TeamPostsEditContent;