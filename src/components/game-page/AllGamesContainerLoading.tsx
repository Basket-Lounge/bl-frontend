import { useContext } from "react";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import AllGamesFilter from "./AllGamesFilter";
import { useStore } from "zustand";


const AllGamesContainerLoading = () => {
  const store = useContext(pageSizeControllerStoreContext)
  const { pageWidth } = useStore(store);

  const size = pageWidth < 768 ? 1 : pageWidth < 1024 ? 2 : 4;

  return (
    <div className="flex flex-col items-stretch gap-[16px]">
      <h3 className="text-[20px] font-bold">2024-25시즌 전체 스케쥴 📅</h3>
      <AllGamesFilter />
      <div className={"grid gap-[16px] w-full animate-pulse grid-cols-1 lg:grid-cols-2 xl:grid-cols-4"}>
        {[...Array(size)].map((_, index) => (
          <div key={index} className="bg-color3 rounded-md h-[300px]" />
        ))}
      </div>
    </div>
  )
}

export default AllGamesContainerLoading;