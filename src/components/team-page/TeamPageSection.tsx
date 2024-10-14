import { TeamStoreContext } from "@/app/teams/[teamId]/layout";
import { Suspense, useContext } from "react"
import { useStore } from "zustand";
import TeamGeneralInfo from "./TeamGeneralInfo";
import TeamSchedule from "./TeamSchedule";
import TeamPlayers from "./TeamPlayers";
import TeamPosts from "./TeamPosts";

export default function TeamPageSection() {
  // const store = useContext(TeamStoreContext);
  // const section = useStore(store, (state) => state.section);

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      {/* <Suspense fallback={<div>Loading...</div>}>
        {section === "general" && <TeamGeneralInfo />}
        {section === "schedule" && <TeamSchedule />}
        {section === "players" && <TeamPlayers />}
        {section === "fan" && <TeamPosts />}
      </Suspense> */}
    </div>
  )
}