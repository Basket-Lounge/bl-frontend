import TeamHeader from "@/components/team-page/TeamHeader";
import TeamSectionOptions from "@/components/team-page/TeamSectionOptions";
import { HydrationBoundary } from "@tanstack/react-query";


export default async function TeamsPage({ children }: { 
  children: React.ReactNode }
) {
  return (
    <HydrationBoundary>
      <div className="my-[32px] flex flex-col items-stretch gap-[24px]">
        <h1 className="text-white text-[24px] lg:text-[32px] font-bold">팀 페이지</h1>
        <TeamHeader />
        <TeamSectionOptions />
        {children}
      </div>
    </HydrationBoundary>
  );
}