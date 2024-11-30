'use client'

import SeasonTopPlayersContainer from "@/components/home-page/SeasonTopPlayersContainer";
import TodayGamesContainer from "@/components/home-page/TodayGamesContainer";
import TodayPopularPostsContainer from "@/components/home-page/TodayPopularPostsContainer";
import { useEffect, useRef } from "react";
import Typed from 'typed.js';


export default function Home() {
  const subHeadingRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const typed = new Typed(subHeadingRef.current!, {
      strings: [
        'NBA에 대한 모든 것을 공유하는 공간',
        'NBA 마니아를 위한 공간',
        'NBA Basketball?'
      ],
      typeSpeed: 50,
      backDelay: 1500,
      showCursor: false,
      loop: true,
    });

    return () => {
      typed.destroy();
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-[32px] items-stretch mx-auto py-[32px]">
      <div className="h-[300px] w-full bg-white/10 rounded-md relative flex flex-col justify-center items-start overflow-hidden px-[64px] lg:px-[128px] gap-[24px]">
        <span
          ref={subHeadingRef}
          className="text-[20px] lg:text-[24px] font-light h-[24px]" 
        />
        <h1 
          ref={headingRef}
          className="text-[32px] lg:text-[40px] font-bold"
        >
          Basket Lounge
        </h1>
      </div>
      <TodayGamesContainer />
      <SeasonTopPlayersContainer />
      <TodayPopularPostsContainer />
    </div>
  );
}