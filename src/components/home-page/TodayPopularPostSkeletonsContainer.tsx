import { useContext } from "react";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import TodayPopularPostSkeleton from "./TodayPopularPostSkeleton";
import { useStore } from "zustand";


const TodayPopularPostSkeletonsContainer = () => {
  const store = useContext(pageSizeControllerStoreContext);
  const pageWidth = useStore(store, (state) => state.pageWidth);

  const skeletonCount = pageWidth < 768 ? 1 : 2;
  const divClassName = pageWidth < 768 ? "grid grid-cols-1" : "grid grid-cols-2";

  return (
    <div className={"gap-[16px] mx-auto animate-pulse mt-[16px] " + divClassName}>
      {[...Array(skeletonCount)].map((_, i) => (
        <TodayPopularPostSkeleton key={i} />
      ))}
    </div>
  );
}

export default TodayPopularPostSkeletonsContainer;