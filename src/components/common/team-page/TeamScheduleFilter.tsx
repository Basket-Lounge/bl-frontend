import TeamScheduleFilterButton from "./TeamScheduleFilterButton";

const TeamScheduleFilter = () => {
  return (
    <div className="flex gap-[24px] items-center mt-[16px]">
      <TeamScheduleFilterButton name="전체" queryKey="0" />
      <TeamScheduleFilterButton name="10월" queryKey="10" />
      <TeamScheduleFilterButton name="11월" queryKey="11" />
      <TeamScheduleFilterButton name="12월" queryKey="12" />
      <TeamScheduleFilterButton name="1월" queryKey="1" />
      <TeamScheduleFilterButton name="2월" queryKey="2" />
      <TeamScheduleFilterButton name="3월" queryKey="3" />
      <TeamScheduleFilterButton name="4월" queryKey="4" />
      <TeamScheduleFilterButton name="플레이오프" queryKey="5" />
    </div>
  );
}

export default TeamScheduleFilter;