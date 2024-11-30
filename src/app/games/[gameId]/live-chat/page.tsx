'use client';

import GameLiveChatBox from "@/components/game-page/GameLiveChatBox";


export default function LiveChatPage() {
  // const { gameId } = useParams();

  // const headerQuery = useSuspenseQuery({
  //   queryKey: ["game", gameId as string],
  //   queryFn: async () => {
  //     return await getGameGeneralInfo(gameId as string);
  //   },
  // });

  return (
    <div className="flex flex-col gap-[32px] items-stretch">
      {/* <GameLiveChatPrediction 
        homeTeam={headerQuery.data.home_team}
        awayTeam={headerQuery.data.visitor_team}
      /> */}
      <GameLiveChatBox />
    </div>
  )
}