import { TeamStoreContext } from "@/app/teams/[teamId]/layout";
import { useContext } from "react";
import { useStore } from "zustand";


const TeamPostsCreateContent = () => {
  const store = useContext(TeamStoreContext);
  const content = useStore(store, (state) => state.postsCreateContent);
  const setContent = useStore(store, (state) => state.updatePostsCreateContent);

  return (
    <textarea
      placeholder="내용을 입력하세요"
      className="bg-color3 p-[24px] text-white outline-none grow placeholder:font-semibold text-[16px] h-[750px] resize-none rounded-md"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}

export default TeamPostsCreateContent;