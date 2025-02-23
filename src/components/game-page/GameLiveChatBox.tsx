import { getConnectionToken, getSubscriptionTokenForLiveGameChat } from "@/api/webSocket.api";
import { IGameChatMessage } from "@/models/game.models";
import { Centrifuge, SubscriptionErrorContext, UnsubscribedContext } from "centrifuge";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import GameLiveChatBoxMessage from "./GameLiveChatBoxMessage";
import GameLiveChatBoxInput from "./GameLiveChatBoxInput";
import { useStore } from "zustand";
import { GameStoreContext } from "@/stores/games.stores";
import SpinnerLoading from "../common/SpinnerLoading";
import RegularButton from "../common/RegularButton";
import { toast } from "react-toastify";
import ImageButton from "../common/ImageButton";
import Image from "next/image";
import GameLiveChatBoxAdminManagementBox from "./GameLiveChatBoxAdminManagementBox";
import { useAuthStore } from "@/stores/auth.stores";
import useLoadChatBlacklist from "@/hooks/useLoadChatBlacklist";
import CuteErrorMessage from "../common/CuteErrorMessage";


const GameLiveChatBox = () => {
  const router = useRouter();
  const { gameId } = useParams<{ gameId: string }>();

  const [connected, setConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionAttempt, setConnectionAttempt] = useState<number>(0);
  const [messages, setMessages] = useState<IGameChatMessage[]>([]);

  const {
    isAuthenticated,
    userRole
  } = useAuthStore();

  useLoadChatBlacklist(gameId);

  const store = useContext(GameStoreContext);
  const setSubscriptionToken = useStore(store, (state) => state.setSubscriptionToken);
  const managementBoxOpen = useStore(store, (state) => state.managementBoxOpen);
  const setManagementBoxOpen = useStore(store, (state) => state.setManagementBoxOpen);
  const setGameChatBlacklist = useStore(store, (state) => state.setGameChatBlacklist);

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
    client.on('connecting', () => {
      setIsLoading(true);
      setConnected(false);
      setError(null);
    });
    client.on("error", () => {
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
    subscription.on("subscribed", () => {
      setIsLoading(false);
      setConnected(true);
      setError(null);
    });
    subscription.on("unsubscribed", (ctx: UnsubscribedContext) => {
      setIsLoading(false);
      setConnected(false);

      if (ctx.reason === "server unsubscribe") {
        toast.error("밴 처리되어 해당 게임 채널에 접속할 수 없습니다.");
        router.push(`/games/${gameId}/summary`);
      } else {
        setError("알 수 없는 이유로 채팅방 접속이 해제되었습니다. 다시 시도 해주세요.");
      }
    });
    subscription.on("error", (ctx: SubscriptionErrorContext) => {
      const errorMsg = ctx.error.message;
      if (errorMsg.includes("400")) {
        setIsLoading(false);
        setConnected(false);
        toast.error("밴 처리되어 해당 게임 채널에 접속할 수 없습니다.");
        router.push(`/games/${gameId}/summary`);
        return;
      }

      setIsLoading(false);
      setConnected(false);
      setError("해당 채널에 접속할 수 없습니다.");
      toast.error("해당 채널에 접속할 수 없습니다. 다시 시도 중입니다.");
    });
    subscription.on("publication", (ctx) => {
      if (ctx.data.type === 'delete_user_messages') {
        if (userRole && userRole > 3) {
          // If user is not admin, remove messages from the user
          setMessages((messages) => messages.filter((message) => message.user.id !== ctx.data.user_id));
        }

        return;
      }
      
      setMessages((prevMessages) => [...prevMessages, ctx.data]);
    });

    subscription.subscribe();
    client.connect();

    return () => {
      subscription.unsubscribe();
      client.disconnect();
    }
  }, [connectionAttempt, gameId]);

  useEffect(() => {
    return () => {
      setSubscriptionToken(null);
      setGameChatBlacklist(null);
    }
  }, [gameId]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  if (isLoading) {
    return <SpinnerLoading />
  }

  if (error || connected === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-[16px]">
        <CuteErrorMessage
          error={error || "채팅 서버 연결 중 오류가 발생했습니다."}
        />  
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
      <div className="flex items-center justify-between">
        <h3 className="text-white text-[20px] font-bold w-full">실시간 채팅방 🗣️</h3>
        {(isAuthenticated && typeof userRole == "number" && userRole <= 3) && (
          <ImageButton
            onClick={() => setManagementBoxOpen(!managementBoxOpen)}
          >
            <Image
              src="/icons/settings_24dp_FFFFFF.svg"
              alt="close-icon"
              width={24}
              height={24}
            />
          </ImageButton>
        )}
      </div>
      {managementBoxOpen && <GameLiveChatBoxAdminManagementBox />}
      <div className="rounded-md border border-white/25 p-[24px] flex flex-col items-stretch gap-[24px] grow overflow-y-auto">
        <div className="grow overflow-auto flex flex-col items-stretch">
          <div className="flex flex-col items-stretch gap-[24px] justify-end w-full">
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