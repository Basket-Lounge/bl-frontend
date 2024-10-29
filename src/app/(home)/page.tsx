'use client'

import { getTodayGames } from "@/api/game.api";
import TodayGamesContainer from "@/components/home-page/TodayGamesContainer";
import { filterTodayGames } from "@/utils/game.utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";


export default function Home() {
  const todayGamesQuery = useSuspenseQuery({
    queryKey: ["home", "today-games"],
    queryFn: async () => {
      const games = await getTodayGames();
      return filterTodayGames(games);
    }
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [leftBtnVisible, setLeftBtnVisible] = useState<boolean>(false);
  const [rightBtnVisible, setRightBtnVisible] = useState<boolean>(true);
  const [itemsPerView, setItemsPerView] = useState(3);

  return (
    <div className="w-full flex flex-col gap-[32px] items-stretch mx-auto">
      {/* Greeting Section */}
      <div className="h-[300px] bg-white w-full relative flex flex-col justify-center items-start overflow-hidden">
        {/* <video 
          loop muted autoPlay 
          className="absolute z-10 left-0 top-0 w-[75%] h-auto"
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video> */}
        <div className="h-[96px] w-fit flex flex-col justify-between px-[128px] z-20 text-white">
          <h2 className="text-[24px] font-light">NBA 마니아를 위한 공간</h2>
          <h1 className="text-[32px] font-bold">Basket Lounge</h1>
        </div>
      </div>
      {/* Today's Game Section */}
      <div>
        <h3 className="text-[20px] font-bold">오늘의 경기</h3>
        <TodayGamesContainer games={todayGamesQuery.data} />
      </div>
      {/* Top 10 Players Section */}
      <div>
        <h3 className="text-[20px] font-bold">2024-25시즌 TOP 10</h3>
        <div className="mt-[16px] flex items-start gap-[32px]">
          <div className="p-[24px] bg-color3 rounded-md w-1/4 flex flex-col gap-[16px]">
            <div className="w-[36px] h-[36px] rounded-full relative bg-white">
              <p className="text-[20px] font-bold absolute top-[50%] right-[50%] -translate-y-[50%] translate-x-[50%] text-black">1</p>
            </div>
            <div className="w-[128px] h-[128px] rounded-full relative bg-white mx-auto"></div>
            <p className="text-[20px] font-semibold text-center">Trae Young</p>
            <div className="flex items-center justify-between">
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">PTS</p>
                <p className="text-[24px] mt-[8px]">24.0</p>
              </div>
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">AST</p>
                <p className="text-[24px] mt-[8px]">10.0</p>
              </div>
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">REB</p>
                <p className="text-[24px] mt-[8px]">5.6</p>
              </div>
            </div>
            <div className="w-full bg-color1 text-[16px] font-semibold py-[12px] text-center rounded-full">
              선수 상세보기 
            </div>
          </div>
          <div className="p-[24px] bg-color3 rounded-md w-1/4 flex flex-col gap-[16px]">
            <div className="w-[36px] h-[36px] rounded-full relative bg-white">
              <p className="text-[20px] font-bold absolute top-[50%] right-[50%] -translate-y-[50%] translate-x-[50%] text-black">1</p>
            </div>
            <div className="w-[128px] h-[128px] rounded-full relative bg-white mx-auto"></div>
            <p className="text-[20px] font-semibold text-center">Trae Young</p>
            <div className="flex items-center justify-between">
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">PTS</p>
                <p className="text-[24px] mt-[8px]">24.0</p>
              </div>
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">AST</p>
                <p className="text-[24px] mt-[8px]">10.0</p>
              </div>
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">REB</p>
                <p className="text-[24px] mt-[8px]">5.6</p>
              </div>
            </div>
            <div className="w-full bg-color1 text-[16px] font-semibold py-[12px] text-center rounded-full">
              선수 상세보기 
            </div>
          </div>
          <div className="p-[24px] bg-color3 rounded-md w-1/4 flex flex-col gap-[16px]">
            <div className="w-[36px] h-[36px] rounded-full relative bg-white">
              <p className="text-[20px] font-bold absolute top-[50%] right-[50%] -translate-y-[50%] translate-x-[50%] text-black">1</p>
            </div>
            <div className="w-[128px] h-[128px] rounded-full relative bg-white mx-auto"></div>
            <p className="text-[20px] font-semibold text-center">Trae Young</p>
            <div className="flex items-center justify-between">
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">PTS</p>
                <p className="text-[24px] mt-[8px]">24.0</p>
              </div>
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">AST</p>
                <p className="text-[24px] mt-[8px]">10.0</p>
              </div>
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">REB</p>
                <p className="text-[24px] mt-[8px]">5.6</p>
              </div>
            </div>
            <div className="w-full bg-color1 text-[16px] font-semibold py-[12px] text-center rounded-full">
              선수 상세보기 
            </div>
          </div>
          <div className="p-[24px] bg-color3 rounded-md w-1/4 flex flex-col gap-[16px]">
            <div className="w-[36px] h-[36px] rounded-full relative bg-white">
              <p className="text-[20px] font-bold absolute top-[50%] right-[50%] -translate-y-[50%] translate-x-[50%] text-black">1</p>
            </div>
            <div className="w-[128px] h-[128px] rounded-full relative bg-white mx-auto"></div>
            <p className="text-[20px] font-semibold text-center">Trae Young</p>
            <div className="flex items-center justify-between">
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">PTS</p>
                <p className="text-[24px] mt-[8px]">24.0</p>
              </div>
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">AST</p>
                <p className="text-[24px] mt-[8px]">10.0</p>
              </div>
              <div className="text-center w-1/3">
                <p className="text-[14px] font-light">REB</p>
                <p className="text-[24px] mt-[8px]">5.6</p>
              </div>
            </div>
            <div className="w-full bg-color1 text-[16px] font-semibold py-[12px] text-center rounded-full">
              선수 상세보기 
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-[20px] font-bold">현재 HOT한 게시물 🔥</h3>
        <div className="mt-[16px] flex items-start gap-[32px]">
          <div className="overflow-hidden rounded-md w-1/2">
            <div className="bg-white p-[50px]"></div>
            <div className="p-[24px] bg-color3 rounded-md w-full flex flex-col gap-[24px]">
              <div>
                <h4 className="text-[20px] font-semibold">르브론의 기록은 역사적?</h4>
                <div className="mt-[16px] flex items-center gap-[16px]">
                  <div className="rounded-full bg-white w-[48px] h-[48px]">
                  </div>
                  <p className="text-[16px]">james1234</p>
                </div>
              </div>
              <div className="flex items-center gap-[24px]"> 
                <div className="gap-[12px] flex items-center">
                  <Image
                    src="/icons/thumb_up_24dp.svg"
                    alt="like"
                    width={24}
                    height={24}
                  />
                  <p className="text-[16px]">
                    123
                  </p>
                </div>
                <div className="gap-[12px] flex items-center">
                  <Image
                    src="/icons/thumb_up_24dp.svg"
                    alt="like"
                    width={24}
                    height={24}
                  />
                  <p className="text-[16px]">
                    123
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-md w-1/2">
            <div className="bg-white p-[50px]"></div>
            <div className="p-[24px] bg-color3 rounded-md w-full flex flex-col gap-[24px]">
              <div>
                <h4 className="text-[20px] font-semibold">르브론의 기록은 역사적?</h4>
                <div className="mt-[16px] flex items-center gap-[16px]">
                  <div className="rounded-full bg-white w-[48px] h-[48px]">
                  </div>
                  <p className="text-[16px]">james1234</p>
                </div>
              </div>
              <div className="flex items-center gap-[24px]"> 
                <div className="gap-[12px] flex items-center">
                  <Image
                    src="/icons/thumb_up_24dp.svg"
                    alt="like"
                    width={24}
                    height={24}
                  />
                  <p className="text-[16px]">
                    123
                  </p>
                </div>
                <div className="gap-[12px] flex items-center">
                  <Image
                    src="/icons/thumb_up_24dp.svg"
                    alt="like"
                    width={24}
                    height={24}
                  />
                  <p className="text-[16px]">
                    123
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}