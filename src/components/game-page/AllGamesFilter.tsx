import FilterButton from "../common/FilterButton";
import AllGamesDateRangeFilterButtonOptionsContainer from "./AllGamesDateRangeFilterButtonOptionsContainer";
import AllGamesTeamsFilterButtonOptionsContainer from "./AllGamesTeamsFilterButtonOptionsContainer";


const AllGamesFilter = () => {
  return (
    <div className="flex justify-between items-end" aria-label="all-games-filter">
      <div className="flex gap-[24px]">
        <FilterButton name="날짜 필터">
          <AllGamesDateRangeFilterButtonOptionsContainer />
        </FilterButton>
        <FilterButton name="팀 필터">
          <AllGamesTeamsFilterButtonOptionsContainer />
        </FilterButton>
      </div>
    </div>
  );
}

export default AllGamesFilter;