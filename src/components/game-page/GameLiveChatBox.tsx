import { getConnectionToken, getSubscriptionToken } from "@/api/webSocket.api";
import { IGameChatMessage } from "@/models/game.models";
import { Centrifuge } from "centrifuge";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import GameLiveChatBoxMessage from "./GameLiveChatBoxMessage";
import GameLiveChatBoxInput from "./GameLiveChatBoxInput";
import { useStore } from "zustand";
import { GameStoreContext } from "@/app/games/[gameId]/layout";


const GameLiveChatBox = () => {
  const { gameId } = useParams();

  const [connected, setConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionAttempt, setConnectionAttempt] = useState<number>(0);

  const [messages, setMessages] = useState<IGameChatMessage[]>([]);

  const store = useContext(GameStoreContext);
  const setSubscriptionToken = useStore(store, (state) => state.setSubscriptionToken);

  const reconnect = () => {
    setConnectionAttempt(attempt => attempt + 1);
  };

  useEffect(() => {
    const client = new Centrifuge("ws://127.0.0.1:8000/connection/websocket", {
      getToken: async () => {
        const data = await getConnectionToken();
        return data.token;
      }
    });
    client.on('connecting', (ctx) => {
      setIsLoading(true);
      setConnected(false);
      setError(null);
    });
    client.on("error", (ctx) => {
      setIsLoading(false);
      setError("웹소켓 연결 중 오류가 발생했습니다.");
    });

    const subscription = client.newSubscription(`games/${gameId}/live-chat`, {
      getToken: async () => {
        const data = await getSubscriptionToken(`games/${gameId}/live-chat`);
        setSubscriptionToken(data.token);
        return data.token;
      }
    });
    subscription.on("subscribed", (ctx) => {
      setIsLoading(false);
      setConnected(true);
    });
    subscription.on("error", (ctx) => {
      setIsLoading(false);
      setError("해당 채널에 접속할 수 없습니다.");
    });
    subscription.on("join", (ctx) => {
      console.log(ctx);
    });
    subscription.on("publication", (ctx) => {
      console.log(ctx);
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
    return <p>채팅 로딩중...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="flex flex-col gap-[16px] item-stretch">
      <h3 className="text-white text-[20px] font-bold">실시간 채팅방 🗣️</h3>
      <div className="rounded-md bg-color3 p-[24px] h-[700px] flex flex-col items-stretch gap-[24px]">
        <div className="flex flex-col items-stretch gap-[16px] justify-end grow">
          {/* Chat Messages */}
          {messages.map((message, index) => (
            <GameLiveChatBoxMessage key={index} message={message} />
          ))}
        </div>
        {/* Chat Input */}
        <GameLiveChatBoxInput />
      </div>
    </div>
  )
}

export default GameLiveChatBox;