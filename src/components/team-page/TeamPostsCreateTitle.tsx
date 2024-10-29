import { TeamStoreContext } from "@/app/teams/[teamId]/layout";
import { useContext } from "react";
import { useStore } from "zustand";


const TeamPostsCreateTitle = () => {
  const store = useContext(TeamStoreContext);
  const title = useStore(store, (state) => state.postsCreateTitle);
  const setTitle = useStore(store, (state) => state.updatePostsCreateTitle);

  return (
    <div className="flex">
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

export default TeamPostsCreateTitle;