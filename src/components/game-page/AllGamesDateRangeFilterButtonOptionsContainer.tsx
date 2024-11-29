import { useCallback, useContext, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { DateRange, DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { useStore } from "zustand";
import { AllGamesStoreContext } from "@/stores/games.stores";


const AllGamesDateRangeFilterButtonOptionsContainer = () => {
  const queryKey = "date-range";

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const store = useContext(AllGamesStoreContext);
  const setGamesParamsModified = useStore(store, (state) => state.setGamesParamsModified);

  const [range, setRange] = useState<DateRange>({
    from: searchParams.get(queryKey + "-start") ? 
      new Date(searchParams.get(queryKey + "-start") as string) : 
      undefined,
    to: searchParams.get(queryKey + "-end") ? 
      new Date(searchParams.get(queryKey + "-end") as string) : 
      undefined,
  });

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (range.from) {
      params.set(queryKey + "-start", range.from.toISOString())
    } else {
      params.delete(queryKey + "-start")
    }
    if (range.to) {
      params.set(queryKey + "-end", range.to.toISOString())
    } else {
      params.delete(queryKey + "-end")
    }

    params.set('page', '1')

    return params.toString()
  }, [range, searchParams])

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setGamesParamsModified(true);
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRange({
      from: undefined,
      to: undefined,
    });
  }

  const handleDaySelect = (dateRange: DateRange | undefined) => {
    if (!dateRange) {
      return;
    }

    setRange(dateRange);
  };

  return (
    <div 
      className="w-[350px] bg-color3 rounded-md p-[24px] z-20 flex gap-[16px] flex-wrap top-[150%] left-0"
    >
      <Popover 
        placement="bottom"
      >
        <PopoverHandler>
          <div className="w-full">
            <label
              className="text-white"
            >
              날짜
            </label>
            <Input
              value={range.from ? range.from.toDateString() + " ~ " + range.to?.toDateString() : ""}
              onPointerEnterCapture={undefined} 
              onPointerLeaveCapture={undefined} 
              crossOrigin={undefined}
              variant="static"
              className="text-white"
              containerProps={{
                className: "border-white peer-focus:border-white"
              }}
            />
          </div>
        </PopoverHandler>
        <PopoverContent 
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}
          className="z-30"
        >
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleDaySelect}
          />
        </PopoverContent>
      </Popover>
      <div className="w-full flex justify-start mt-[16px] gap-[16px]">
        <button
          className="bg-color4 text-white px-[12px] py-[8px] rounded-full w-full"
          onClick={handleResetClick}
        >
          초기화
        </button>
        <button
          className="bg-color4 text-white px-[12px] py-[8px] rounded-full w-full"
          onClick={handleApplyClick}
        >
          적용
        </button>
      </div>
    </div>
  )
}

export default AllGamesDateRangeFilterButtonOptionsContainer;