import SeasonTopPlayerSkeleton from "./SeasonTopPlayerSkeleton";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import { useContext } from "react";
import { useStore } from "zustand";


export default function SeasonTopPlayerSkeletonsContainer() {
  const store = useContext(pageSizeControllerStoreContext);
  const pageWidth = useStore(store, (state) => state.pageWidth);

  const skeletonCount = pageWidth < 768 ? 1 : pageWidth < 1024 ? 2 : 4;
  const divClassName = pageWidth < 768 ? "grid grid-cols-1" : pageWidth < 1024 ? "grid grid-cols-2" : "grid grid-cols-4";

  return (
    <div className={"w-full gap-[16px] items-stretch animate-pulse mt-[16px] " + divClassName}>
      {[...Array(skeletonCount)].map((_, i) => (
        <SeasonTopPlayerSkeleton key={i} />
      ))}
    </div>
  );

}