import { getConnectionToken, getSubscriptionToken } from "@/api/webSocket.api";
import { Centrifuge, ConnectedContext, JoinContext, PublicationContext } from "centrifuge";
import { use, useEffect, useState } from "react";


interface IUseGameLiveChat {
  gameId: string;
  publicationCallback: (ctx: PublicationContext) => void;
  joinCallback: (ctx: JoinContext) => void;
};
  

const useGameLiveChat = (
  { gameId, publicationCallback, joinCallback }: IUseGameLiveChat
) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<number>(0);

  const reconnect = () => {
    setAttempt(attempt + 1);
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
    });
    client.on("error", (ctx) => {
      console.log(ctx);
      setIsLoading(false);
      setError("웹소켓 연결 중 오류가 발생했습니다.");
    });

    const subscription = client.newSubscription(`games/${gameId}/live-chat`, {
      getToken: async () => {
        const data = await getSubscriptionToken(`games/${gameId}/live-chat`);
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
      joinCallback(ctx);
    });
    subscription.on("publication", (ctx) => {
      publicationCallback(ctx);
    });
    subscription.subscribe();
    client.connect();

    return () => {
      subscription.unsubscribe();
      client.disconnect();
    }
  }, [attempt]);

  return { connected, isLoading, error, reconnect };
};

export default useGameLiveChat;