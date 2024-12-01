import { useContext } from "react";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import { useStore } from "zustand";

const TeamGeneralInfoRecentGamesSkeletons = () => {
  const store = useContext(pageSizeControllerStoreContext);
  const pageWidth = useStore(store, (state) => state.pageWidth);

  const skeletonCount = pageWidth < 768 ? 1 : pageWidth < 1024 ? 2 : 4;
  const divClassName = pageWidth < 768 ? "grid grid-cols-1" : pageWidth < 1024 ? "grid grid-cols-2" : "grid grid-cols-4";

  return (
    <div className={"w-full gap-[16px] items-stretch animate-pulse mt-[16px] " + divClassName}>
      {[...Array(skeletonCount)].map((_, i) => (
        <div className="bg-color3 animate-pulse w-full h-[250px] rounded-md" key={i} />
      ))}
    </div>
  )
}

export default TeamGeneralInfoRecentGamesSkeletons;