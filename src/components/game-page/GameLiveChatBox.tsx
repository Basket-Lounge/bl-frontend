import { getConnectionToken, getSubscriptionTokenForLiveGameChat } from "@/api/webSocket.api";
import { IGameChatMessage } from "@/models/game.models";
import { Centrifuge } from "centrifuge";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import GameLiveChatBoxMessage from "./GameLiveChatBoxMessage";
import GameLiveChatBoxInput from "./GameLiveChatBoxInput";
import { useStore } from "zustand";
import { GameStoreContext } from "@/stores/games.stores";
import SpinnerLoading from "../common/SpinnerLoading";
import RegularButton from "../common/RegularButton";
import { toast } from "react-toastify";


const GameLiveChatBox = () => {
  const { gameId } = useParams();

  const [connected, setConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionAttempt, setConnectionAttempt] = useState<number>(0);

  const [messages, setMessages] = useState<IGameChatMessage[]>([]);

  const store = useContext(GameStoreContext);
  const setSubscriptionToken = useStore(store, (state) => state.setSubscriptionToken);

  const handleRetryClick = () => {
    setConnectionAttempt(attempt => attempt + 1);
  };

  useEffect(() => {
    const client = new Centrifuge(
      `${process.env.NEXT_PUBLIC_CENTRIFUGO_SERVER_WS_URL}/connection/websocket`, 
      {
        getToken: async () => {
          const data = await getConnectionToken();
          return data.token;
        }
      }
    );
    client.on('connecting', (ctx) => {
      setIsLoading(true);
      setConnected(false);
      setError(null);
    });
    client.on("error", (ctx) => {
      setIsLoading(false);
      setConnected(false);
      setError("채팅 서버 연결 중 오류가 발생했습니다.");
      toast.error("채팅 서버 연결 중 오류가 발생했습니다.");
    });

    const subscription = client.newSubscription(`games/${gameId}/live-chat`, {
      getToken: async () => {
        const data = await getSubscriptionTokenForLiveGameChat(gameId as string);
        setSubscriptionToken(data.token);
        return data.token;
      }
    });
    subscription.on("subscribed", (ctx) => {
      setIsLoading(false);
      setConnected(true);
      setError(null);
    });
    subscription.on("error", (ctx) => {
      setIsLoading(false);
      setConnected(false);
      setError("해당 채널에 접속할 수 없습니다.");
      toast.error("해당 채널에 접속할 수 없습니다. 다시 시도해주세요.");
    });
    subscription.on("publication", (ctx) => {
      setMessages((prevMessages) => [...prevMessages, ctx.data]);
    });

    subscription.subscribe();
    client.connect();

    return () => {
      subscription.unsubscribe();
      client.disconnect();
    }
  }, [connectionAttempt]);

  if (isLoading) {
    return <SpinnerLoading />
  }

  if (error || connected === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-[16px]">
        <p className="font-bold text-[20px]">
          {error}
        </p>
        <RegularButton
          onClick={handleRetryClick}
        >
          다시 시도
        </RegularButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16px] items-stretch h-screen">
      <h3 className="text-white text-[20px] font-bold w-full">실시간 채팅방 🗣️</h3>
      <div className="rounded-md bg-color3 p-[24px] flex flex-col items-stretch gap-[24px] grow overflow-y-auto">
        <div className="grow overflow-auto flex flex-col items-stretch">
          <div className="flex flex-col items-stretch gap-[16px] justify-end w-full">
            {messages.map((message, index) => (
              <GameLiveChatBoxMessage key={index} message={message} />
            ))}
          </div>
        </div>
        <GameLiveChatBoxInput />
      </div>
    </div>
  )
}

export default GameLiveChatBox;