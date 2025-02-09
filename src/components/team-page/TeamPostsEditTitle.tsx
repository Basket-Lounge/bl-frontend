import { useTeamStore } from "@/stores/teams.stores";


const TeamPostsEditTitle = () => {
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