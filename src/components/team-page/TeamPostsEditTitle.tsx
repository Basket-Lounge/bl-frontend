import { TeamStoreContext, useTeamStore } from "@/stores/teams.stores";
import { useContext } from "react";
import { useStore } from "zustand";


const TeamPostsEditTitle = () => {
  // const store = useContext(TeamStoreContext);
  // const title = useStore(store, (state) => state.postsEditTitle);
  // const setTitle = useStore(store, (state) => state.updatePostsEditTitle);
  // const titleError = useStore(store, (state) => state.postsEditTitleError);
  const {
    postsEditTitle: title,
    updatePostsEditTitle: setTitle,
    postsEditTitleError: titleError
  } = useTeamStore();

  return (
    <div className="flex flex-col items-stretch gap-[16px]">
      {titleError && (
        <p className="text-red-500 font-semibold text-[16px]">{titleError}</p>
      )}
      <input
        type="text"
        placeholder="제목을 입력하세요"
        className="bg-transparent text-white font-semibold outline-none grow placeholder:font-semibold text-[24px]"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}

export default TeamPostsEditTitle;