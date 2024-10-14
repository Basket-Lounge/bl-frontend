import TeamPlayersFilterButton from "./TeamPlayersFilterButton";


const TeamPlayersFilter = () => {
  return (
    <div className="flex gap-[24px] items-center">
      <TeamPlayersFilterButton queryKey="A" name="전체" />
      <TeamPlayersFilterButton queryKey="G" name="가드" />
      <TeamPlayersFilterButton queryKey="F" name="포워드" />
      <TeamPlayersFilterButton queryKey="C" name="센터" />
    </div>
  );    
}

export default TeamPlayersFilter;