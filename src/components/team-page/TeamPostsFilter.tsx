import { useTeamStore } from "@/stores/teams.stores";
import FilterButton from "../common/FilterButton";
import SearchBox from "../common/SearchBox";
import TeamPostsSortButtonOptionsContainer from "./TeamPostsSortButtonOptionsContainer";
import TeamPostsGoToCreateButton from "./TeamPostsGoToCreateButton";


const TeamPostsFilter = () => {
  const { setPostsArgumentsModified } = useTeamStore();

  return (
    <section className="flex justify-between items-end">
      <div className="flex gap-[24px]" aria-label="team-posts-filter-buttons">
        <FilterButton name="정렬">
          <TeamPostsSortButtonOptionsContainer />
        </FilterButton>
      </div>
      <div className="flex gap-[24px] items-center">
        <TeamPostsGoToCreateButton />
        <SearchBox 
          pressEnterCallback={() => setPostsArgumentsModified(true)} 
          aria-label="search-team-posts"
        />
      </div>
    </section>
  );
}

export default TeamPostsFilter;